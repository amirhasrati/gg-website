import { useState, useEffect, useCallback } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";


export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [userRole, setUserRole] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [roleLoading, setRoleLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchUserRole = useCallback(async (userId: string) => {
		try {
			setRoleLoading(true);
			setError(null);

			const { data, error: roleError } = await supabase
				.from("user_roles")
				.select("role")
				.eq("user_id", userId)
				.single();

			if (roleError) {
				setError(`Failed to fetch user role: ${roleError.message}`);
				setUserRole(null);
				return;
			}

			if (data) {
				setUserRole(data.role);
			} else {
				setUserRole(null);
				setError("No role found for user.");
			}
		} catch (error) {
			console.error("Unexpected error fetching user role:", error);
			setError("Unexpected error occurred while fetching user role.");
			setUserRole(null);
		} finally {
			setRoleLoading(false);
		}
	}, []);

	useEffect(() => {
		const getInitialSession = async () => {
			try {
				setError(null);
				const {
					data: { session },
				} = await supabase.auth.getSession();

				setUser(session?.user ?? null);

				if (session?.user) {
					await fetchUserRole(session.user.id);
				} else {
					setUserRole(null);
				}
			} catch (error) {
				console.error("Error getting initial session:", error);
				setError("Failed to get initial session.");
			} finally {
				setLoading(false);
			}
		};

		getInitialSession();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			try {
				setError(null);
				setUser(session?.user ?? null);

				if (session?.user) {
					await fetchUserRole(session.user.id);
				} else {
					setUserRole(null);
				}
			} catch (error) {
				console.error("Error during auth state change:", error);
				setError("Authentication error occurred.");
			} finally {
				setLoading(false);
			}
		});

		return () => subscription.unsubscribe();
	}, [fetchUserRole]);

	const signOut = async () => {
		try {
			setError(null);
			const { error: signOutError } = await supabase.auth.signOut();

			if (signOutError) {
				console.error("Error signing out:", signOutError);
				setError(`Sign out failed: ${signOutError.message}`);
				return;
			}

			setUser(null);
			setUserRole(null);
		} catch (error) {
			console.error("Unexpected error during sign out:", error);
			setError("Unexpected error occurred during sign out.");
		}
	};

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	const isAdmin = userRole?.toLowerCase() === "admin";
	const isExec = userRole?.toLowerCase() === "exec";
	const isRegular = userRole?.toLowerCase() === "regular";

	return {
		user,
		userRole,
		loading,
		roleLoading,
		error,
		signOut,
		clearError,
		isAdmin,
		isExec,
		isRegular,
	};
};
