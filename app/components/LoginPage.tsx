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
		<div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-8">
			<div className="max-w-md w-full mx-auto">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold text-gray-900 mb-2">
						Welcome Back
					</h2>
					<p className="text-gray-600 text-sm">
						Sign in to your account with a magic link
					</p>
				</div>

				<div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-8">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
								Email Address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
									</svg>
								</div>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									disabled={isLoading}
									className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
									placeholder="Enter your email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						{status !== "idle" && (
							<div
								className={`text-sm text-center p-4 rounded-lg border ${
									status === "loading"
										? "bg-blue-50 text-blue-700 border-blue-200"
										: status === "success"
											? "bg-green-50 text-green-700 border-green-200"
											: "bg-red-50 text-red-700 border-red-200"
								}`}
							>
								{status === "loading" && (
									<div className="flex items-center justify-center space-x-3">
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
										<span className="font-medium">{message}</span>
									</div>
								)}
								{status !== "loading" && (
									<>
										<div className="flex items-center justify-center mb-3">
											{status === "success" ? (
												<svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
												</svg>
											) : (
												<svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
												</svg>
											)}
											<p className="font-medium">{message}</p>
										</div>
										{status === "success" && (
											<button
												type="button"
												onClick={resetForm}
												className="text-sm text-green-600 hover:text-green-800 underline font-medium transition-colors duration-200"
											>
												Send to a different email
											</button>
										)}
										{status === "error" && (
											<button
												type="button"
												onClick={resetForm}
												className="text-sm text-red-600 hover:text-red-800 underline font-medium transition-colors duration-200"
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
								className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
							>
								{isLoading ? (
									<div className="flex items-center justify-center space-x-2">
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
										<span>Sending Magic Link...</span>
									</div>
								) : (
									"Send Magic Link"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
