import { useState } from "react";
import { supabase } from "~/lib/supabase";

const LoginPage: React.FC = () => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email.trim()) return;

		setIsLoading(true);
		setStatus("loading");
		setMessage("Sending magic link...");

		try {
			const { error } = await supabase.auth.signInWithOtp({
				email: email.trim(),
				options: {
					emailRedirectTo: `${window.location.origin}/auth/callback`,
				},
			});

			if (error) {
				setStatus("error");
				setMessage(error.message);
				console.error("Error sending magic link:", error.message);
			} else {
				setStatus("success");
				setMessage("Magic link sent! Check your email.");
			}
		} catch (error) {
			setStatus("error");
			setMessage("An unexpected error occurred. Please try again.");
			console.error("Unexpected error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const resetForm = () => {
		setEmail("");
		setStatus("idle");
		setMessage("");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email" className="sr-only">
							Email address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							disabled={isLoading}
							className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
							placeholder="Email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					{/* Status Messages */}
					{status !== "idle" && (
						<div
							className={`text-sm text-center p-3 rounded-md ${
								status === "loading"
									? "bg-blue-50 text-blue-700"
									: status === "success"
										? "bg-green-50 text-green-700"
										: "bg-red-50 text-red-700"
							}`}
						>
							{status === "loading" && (
								<div className="flex items-center justify-center space-x-2">
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
									<span>{message}</span>
								</div>
							)}
							{status !== "loading" && (
								<>
									<p className="mb-3">{message}</p>
									{status === "success" && (
										<button
											type="button"
											onClick={resetForm}
											className="text-sm text-green-600 hover:text-green-800 underline"
										>
											Send to a different email
										</button>
									)}
									{status === "error" && (
										<button
											type="button"
											onClick={resetForm}
											className="text-sm text-red-600 hover:text-red-800 underline"
										>
											Try again
										</button>
									)}
								</>
							)}
						</div>
					)}

					<div>
						<button
							type="submit"
							disabled={isLoading || !email.trim()}
							className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? (
								<div className="flex items-center space-x-2">
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
									<span>Sending...</span>
								</div>
							) : (
								"Sign in"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
