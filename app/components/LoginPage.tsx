import { useFetcher } from "react-router";

const LoginPage: React.FC = () => {
	const fetcher = useFetcher<{
		success: boolean;
		error?: string;
		message?: string;
	}>();

	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-8">
			<div className="max-w-md w-full mx-auto">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold text-gray-900 mb-2">
						Welcome Back
					</h2>
					<p className="text-gray-600 text-sm">
						Sign in to your account with an email link
					</p>
				</div>

				<div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-8">
					{/* Success Message */}
					{fetcher.data?.success && (
						<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
							<div className="flex items-center">
								<svg
									className="h-5 w-5 text-green-500 mr-3"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-labelledby="success-icon"
								>
									<title id="success-icon">Success</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<p className="text-sm font-medium text-green-800">
									{fetcher.data.message}
								</p>
							</div>
						</div>
					)}

					{/* Error Message */}
					{fetcher.data?.success === false && (
						<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
							<div className="flex items-center">
								<svg
									className="h-5 w-5 text-red-500 mr-3"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-labelledby="error-icon"
								>
									<title id="error-icon">Error</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<p className="text-sm font-medium text-red-800">
									{fetcher.data.error}
								</p>
							</div>
						</div>
					)}

					<fetcher.Form className="space-y-6" action="/login" method="POST">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Email Address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<svg
										className="h-5 w-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
										/>
									</svg>
								</div>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 text-sm transition-all duration-200 hover:border-gray-400"
									placeholder="Enter your email address"
									disabled={fetcher.data?.success}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={fetcher.state !== "idle" || fetcher.data?.success}
								className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 ${
									fetcher.data?.success
										? "bg-green-500 cursor-not-allowed"
										: fetcher.state !== "idle"
											? "bg-gray-400 cursor-not-allowed"
											: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:scale-[1.02] active:scale-[0.98] focus:ring-orange-500"
								}`}
							>
								<span className="flex items-center">
									{fetcher.state !== "idle" ? (
										<>
											<svg
												className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
												fill="none"
												viewBox="0 0 24 24"
												aria-labelledby="loading-icon"
											>
												<title id="loading-icon">Loading</title>
												<circle
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
													className="opacity-25"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											Sending...
										</>
									) : fetcher.data?.success ? (
										<>
											<svg
												className="mr-2 h-4 w-4 text-white"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												aria-labelledby="success-button-icon"
											>
												<title id="success-button-icon">Success</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											Email Sent!
										</>
									) : (
										"Send Sign-in Link"
									)}
								</span>
							</button>
						</div>
					</fetcher.Form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
