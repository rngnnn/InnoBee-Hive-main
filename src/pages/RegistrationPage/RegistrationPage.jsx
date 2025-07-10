import { Link } from 'react-router-dom';
import { goBack } from '../../helpers';

// TODO: Refactor this page to use tailwind and actually register a user
// import GoogleLogo from "../../assets/icons/google-color-icon.svg"; // Mohammad: Replace logo with io5 IoLogoGoogle and see if it looks better, just a suggestion
// import LinkedInLogo from "../../assets/icons/linkedin-app-icon.svg";
// import MetaLogo from "../../assets/icons/meta-icon.svg";
import Logo from '../../assets/images/logo.png';
import { useAuth } from 'src/context/useAuth';
import { Button } from 'src/components/buttons/Button'; // Using your custom Button
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerSchema } from 'src/helpers/schemas';

const RegistrationPage = () => {
	const { registerUser } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(registerSchema),
	});

	const handleRegistration = async (data) => {
		// Simulate registration process
		console.log('Registration data:', data);
		// await registerUser(data.name, data.email, data.password); // Uncomment for actual auth logic
		await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async operation
		console.log('Registration simulated success');
		// Typically handle navigation or state update after successful registration
	};

	return (
		<>
			<button
				className="text-pri-color bg-white font-medium p-0 hover:text-sec-color"
				onClick={goBack}
			>
				Back
			</button>
			{/* <div className="flex flex-col items-center h-full w-full ">
        <img src={Logo} alt="logo" className="w-44 lg:mt-4 mt-8" />
        <h4 className="font-semibold text-3xl"> Create an account</h4>
        <div className="w-full pt-14 flex flex-col gap-6 max-w-[300px]">
          <div className="w-full py-3 rounded-full border-2 border-gray-800 flex gap-3 items-center px-2 cursor-pointer">
            <img src={GoogleLogo} alt="Google logo" className="h-8 w-8" />
            <p>Continue with Google</p>
          </div>
          <div className="w-full py-3 rounded-full border-2 border-gray-800 flex gap-3 items-center px-2 cursor-pointer">
            <img src={MetaLogo} alt="Google logo" className="h-8 w-8" />
            <p>Continue with Meta</p>
          </div>
          <div className="w-full py-3 rounded-full border-2 border-gray-800 flex gap-3 items-center px-2 cursor-pointer">
            <img src={LinkedInLogo} alt="Google logo" className="h-8 w-8" />
            <p>Continue with LinkedIn</p>
          </div>
        </div>
        <p className=" text-center py-8">
          By continuing,you agree to InnoBee's <br />
          <Link to="/register" className="text-pri-color hover:text-sec-color">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link to="/register" className="text-pri-color hover:text-sec-color">
            Privacy Policy
          </Link>
        </p>
        <p className="font-bold">
          Already have an account?{" "}
          <Link to="/login" className="text-pri-color hover:text-sec-color">
            Login
          </Link>
        </p>
      </div> */}

			<div className="flex flex-col items-center h-full w-full gap-4">
				<img src={Logo} alt="logo" className="w-44 lg:mt-4 mt-8" />
				<h4 className="font-semibold text-3xl"> Create an account</h4>
				<form
					className="w-full pt-14 flex flex-col gap-6 max-w-[300px]"
					onSubmit={handleSubmit(handleRegistration)}
				>
					<div className="flex flex-col">
						<label className="font-semibold" htmlFor="name">
							Name
						</label>
						<input
							id="name"
							{...register('name')}
							className="py-3 px-2 shadow outline-none border-none"
							type="text"
							placeholder="Name"
						/>
						{errors.name && (
							<div className="text-red-500 text-sm">{errors.name.message}</div> // Added text-sm
						)}
					</div>
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
							<div className="text-red-500 text-sm">{errors.email.message}</div> // Added text-sm
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="password" className="font-semibold">
							Password
						</label>
						<input
							id="password"
							className="shadow outline-none border-none py-3 px-2"
							{...register('password')}
							type="password" // Changed type to password for security
							placeholder="Enter your password"
						/>
						{errors.password && (
							<div className="text-red-500 text-sm">
								{errors.password.message}
							</div> // Added text-sm
						)}
					</div>

					{/* Refactored Sign Up Button */}
					<Button
						className="w-full bg-brown hover:bg-pri-color h-12"
						type="submit"
						// Removed label prop
						loading={isSubmitting}
					>
						{/* Text as children. The custom Button component handles loading state text if implemented.
                If not, you might need to explicitly show 'Signing Up...' here using {isSubmitting ? 'Signing Up...' : 'SIGN UP'}
                but your custom Button component likely has the spinner/loading text logic built in
            */}
						Sign up
					</Button>
				</form>
				<p className=" text-center py-8">
					By continuing,you agree to InnoBee's <br />
					<Link to="/register" className="text-pri-color hover:text-sec-color">
						Terms of Use
					</Link>{' '}
					and{' '}
					<Link to="/register" className="text-pri-color hover:text-sec-color">
						Privacy Policy
					</Link>
				</p>
				<p className="font-bold pb-4">
					Already have an account?{' '}
					<Link
						to="/login"
						className="text-pri-color hover:text-sec-color mb-4" // mb-4 seems out of place on Link
					>
						Login
					</Link>
				</p>
			</div>
		</>
	);
};

export default RegistrationPage;
