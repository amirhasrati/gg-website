import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { supabase } from "~/lib/supabase";

// Required loader function for React Router 7
export const loader = async () => {
	return null; // Return null since we don't need to load any data
};

const AuthCallback: React.FC = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [status, setStatus] = useState<"loading" | "success" | "error">(
		"loading",
	);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const handleAuthCallback = async () => {
			try {
				// For email sign-in links, Supabase automatically handles the session
				// We just need to check if we have a valid session
				const {
					data: { session },
					error,
				} = await supabase.auth.getSession();

				if (error) {
					setStatus("error");
					setMessage("Authentication failed. Please try again.");
					console.error("Auth error:", error);
					return;
				}

				if (session?.user) {
					setStatus("success");
					setMessage("Successfully authenticated! Redirecting...");

					// Redirect to home page after successful authentication
					setTimeout(() => {
						navigate("/");
					}, 2000);
				} else {
					setStatus("error");
					setMessage("No valid session found. Please try logging in again.");
				}
			} catch (error) {
				setStatus("error");
				setMessage("An unexpected error occurred.");
				console.error("Unexpected error:", error);
			}
		};

		handleAuthCallback();
	}, [navigate]);

	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 text-center">
				{status === "loading" && (
					<div>
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
						<h2 className="text-xl font-semibold text-gray-900">
							Authenticating...
						</h2>
						<p className="text-gray-600">
							Please wait while we verify your login.
						</p>
					</div>
				)}

				{status === "success" && (
					<div>
						<div className="text-green-500 text-6xl mb-4">✓</div>
						<h2 className="text-xl font-semibold text-gray-900">
							Authentication Successful!
						</h2>
						<p className="text-gray-600">{message}</p>
					</div>
				)}

				{status === "error" && (
					<div>
						<div className="text-red-500 text-6xl mb-4">✗</div>
						<h2 className="text-xl font-semibold text-gray-900">
							Authentication Failed
						</h2>
						<p className="text-gray-600">{message}</p>
						<button
							type="button"
							onClick={() => navigate("/login")}
							className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
						>
							Try Again
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AuthCallback;
