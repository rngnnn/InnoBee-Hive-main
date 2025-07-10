import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { goBack } from '../../helpers';
import { Button } from 'src/components/buttons/Button';
import { useAuth } from 'src/context/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from 'src/helpers/schemas';
import { z } from 'zod';

// Define the login form schema type
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
	const [inputType, setInputType] = useState('password');
	// const { loginUser } = useAuth(); // Commented out in original
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const handlePasswordToggle = () => {
		inputType === 'password' ? setInputType('text') : setInputType('password');
	};

	const handleLogin = async (data: LoginFormData) => {
		console.log('Login data:', data); // Added console log
		// await loginUser(data.email, data.password); // Commented out in original
		await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate async login
		navigate('/overview');
	};

	return (
		<>
			<button
				className="text-pri-color bg-white font-medium p-0 hover:text-sec-color"
				onClick={goBack}
			>
				Back
			</button>
			<div className="flex flex-col items-center h-full w-full ">
				<img src={Logo} alt="logo" className="w-44 lg:mt-4 mt-8" />
				<h4 className="font-semibold text-3xl"> Log in</h4>
				<form
					className="w-full pt-14 flex flex-col gap-6 max-w-[300px]"
					onSubmit={handleSubmit(handleLogin)}
				>
					<div className="flex flex-col">
						<label htmlFor="email" className="font-semibold">
							Email
						</label>
						<input
							id="email"
							{...register('email')}
							className="py-3 px-2 shadow outline-none border-none"
							type="text"
							placeholder="John@gmail.com"
						/>
						{errors.email && (
							<div className="text-red-500 text-sm">
								{String(errors.email.message)}
							</div>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="password" className="font-semibold">
							Password
						</label>

						<div className="flex items-center justify-between shadow px-2">
							<input
								id="password"
								className=" flex-1 outline-none border-none py-3"
								{...register('password')}
								type={inputType}
								placeholder="Enter your password"
							/>

							<span
								onClick={handlePasswordToggle}
								className="text-gray-400 cursor-pointer"
							>
								{' '}
								{inputType === 'password' ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
									</svg>
								)}
							</span>
						</div>
						{errors.password && (
							<div className="text-red-500 text-sm">
								{String(errors.password.message)}
							</div>
						)}
					</div>
					<div className="flex items-center gap-2">
						<input type="checkbox" name="stay" id="stay" />
						<label htmlFor="stay" className="m-0 cursor-pointer">
							Stay logged in
						</label>
					</div>
					<Button
						className="w-full bg-brown hover:bg-pri-color h-12"
						type="submit"
						loading={isSubmitting}
						onClick={() => {}}
						disabled={isSubmitting}
						iconLeft={null}
						iconRight={null}
						iconClass=""
						ariaLabel="Login button"
						style={{}}
					>
						Log in
					</Button>
				</form>
				<Link
					to="/forgot-password"
					className="text-pri-color font-bold py-8 hover:text-sec-color"
				>
					Forgot my password
				</Link>
				<p className="font-bold">
					Don't have an account?{' '}
					<Link to="/register" className="text-pri-color hover:text-sec-color">
						Sign up
					</Link>
				</p>
			</div>
		</>
	);
};

export default Login;
