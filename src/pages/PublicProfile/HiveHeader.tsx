import React, { useState } from 'react';
import {
	IoSearchOutline,
	IoNotificationsOutline,
	IoCaretDownOutline,
	IoPeopleOutline,
	IoPersonOutline,
	IoCubeOutline,
	IoHomeOutline,
	IoMapOutline,
	IoHelpOutline,
} from 'react-icons/io5';
import Logo from '../../assets/images/logohead.png';
import { LuCrown } from 'react-icons/lu';
import { BiHive } from 'react-icons/bi';

const HiveHeader = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<header className="bg-white py-3 border-b border-gray-200 fixed top-0 left-0 right-0 z-max">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
				{/* Logo */}
				<div className="flex-shrink-0">
					<img src={Logo} alt="Hive Logo" className="h-10" />
				</div>

				{/* Search Bar (Visible on larger screens) */}
				<div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-1 ml-6">
					<input
						type="text"
						placeholder="Search"
						className="bg-transparent border-none p-2 w-64 focus:outline-none text-sm"
					/>
					<IoSearchOutline className="text-gray-500 text-lg" />
				</div>

				{/* Mobile Search Bar */}
				<div className="md:hidden flex-grow flex items-center">
					<div className="bg-gray-100 rounded-lg px-3 py-1 mx-4 flex items-center flex-grow">
						<input
							type="text"
							placeholder="Search"
							className="bg-transparent border-none p-1 w-full focus:outline-none text-sm"
						/>
						<IoSearchOutline className="text-gray-500 text-lg" />
					</div>
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden">
					<button
						onClick={toggleMobileMenu}
						className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
						aria-expanded={isMobileMenuOpen}
						aria-controls="mobile-menu"
					>
						<svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
							{isMobileMenuOpen ? (
								<path
									fillRule="evenodd"
									d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829z"
									clipRule="evenodd"
								/>
							) : (
								<path
									fillRule="evenodd"
									d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
									clipRule="evenodd"
								/>
							)}
						</svg>
					</button>
				</div>

				{/* Navigation Links */}
				<nav className="hidden md:flex items-center space-x-6 ml-auto">
					<a
						href="/"
						className="text-gray-600 hover:text-gray-800 text-sm flex flex-col items-center"
					>
						<IoHomeOutline className="text-gray-500 text-3xl mb-1" />
						<span className="text-base">Home</span>
					</a>
					<a
						href="/"
						className="text-gray-600 hover:text-gray-800 text-sm flex flex-col items-center"
					>
						<IoMapOutline className="text-gray-500 text-3xl mb-1" />
						<span className="text-base">Challenges</span>
					</a>
					<a
						href="/"
						className="text-gray-600 hover:text-gray-800 text-sm flex flex-col items-center"
					>
						<LuCrown
							className="text-gray-500 text-3xl mb-1"
							style={{ strokeWidth: '1.5' }}
						/>{' '}
						{/* Added inline style */}
						<span className="text-base">Plans</span>
					</a>
					<a
						href="/"
						className="text-gray-600 hover:text-gray-800 text-sm flex flex-col items-center"
					>
						<IoPeopleOutline className="text-gray-500 text-3xl mb-1" />
						<span className="text-base">About Us</span>
					</a>
					<a
						href="/"
						className="text-gray-600 hover:text-gray-800 text-sm flex flex-col items-center"
					>
						<IoNotificationsOutline className="text-gray-500 text-3xl mb-1" />
						<span className="text-base">Notifications</span>
					</a>
					<div className="relative">
						<a
							href="/"
							className="text-gray-600 hover:text-gray-800 text-sm flex flex-col items-center"
						>
							<IoPersonOutline className="text-gray-500 text-3xl mb-1" />
							<div className="flex items-center">
								<span className="text-base mr-1">Me</span>
								<IoCaretDownOutline className="text-gray-500 text-sm" />
							</div>
						</a>
						{/* Dropdown menu can be added here */}
					</div>
					<button className="bg-[#FFB000] hover:bg-[#F9DB28] text-[#2D2D2D] font-semibold py-3 px-6 rounded-full text-base focus:outline-none focus:shadow-outline flex items-center">
						<BiHive className="text-xl mr-2" />
						Hive
					</button>
					<a
						href="/"
						className="text-gray-600 hover:text-gray-800 text-sm flex flex-col items-center"
					>
						<IoHelpOutline className="text-gray-500 text-3xl mb-1" />
						<span className="text-base">Help</span>
					</a>
				</nav>
			</div>

			{/* Mobile Menu (Hidden by default) */}
			{isMobileMenuOpen && (
				<div className="md:hidden bg-white shadow-md absolute top-full left-0 right-0 z-max">
					<div className="px-4 py-3 space-y-3">
						<a
							href="/"
							className="py-3 text-sm text-gray-600 hover:bg-gray-100 flex flex-col items-center"
						>
							<IoHomeOutline className="text-gray-500 text-2xl mb-1" />
							<span className="text-base">Home</span>
						</a>
						<a
							href="/"
							className="py-3 text-sm text-gray-600 hover:bg-gray-100 flex flex-col items-center"
						>
							<IoMapOutline className="text-gray-500 text-2xl mb-1" />
							<span className="text-base">Challenges</span>
						</a>
						<a
							href="/"
							className="py-3 text-sm text-gray-600 hover:bg-gray-100 flex flex-col items-center"
						>
							<LuCrown
								className="text-gray-500 text-2xl mb-1"
								style={{ strokeWidth: '1.5' }}
							/>{' '}
							{/* Added inline style to change the outline's width */}
							<span className="text-base">Plans</span>
						</a>
						<a
							href="/"
							className="py-3 text-sm text-gray-600 hover:bg-gray-100 flex flex-col items-center"
						>
							<IoPeopleOutline className="text-gray-500 text-2xl mb-1" />
							<span className="text-base">About Us</span>
						</a>
						<a
							href="/"
							className="py-3 text-sm text-gray-600 hover:bg-gray-100 flex flex-col items-center"
						>
							<IoNotificationsOutline className="text-gray-500 text-2xl mb-1" />
							<span className="text-base">Notifications</span>
						</a>
						<div className="relative">
							<a
								href="/"
								className="py-3 text-sm text-gray-600 hover:bg-gray-100 flex flex-col items-center"
							>
								<IoPersonOutline className="text-gray-500 text-2xl mb-1" />
								<div className="flex items-center">
									<span className="text-base mr-1">Me</span>
									<IoCaretDownOutline className="text-gray-500 text-sm" />
								</div>
							</a>
							{/* Mobile dropdown menu can be added here */}
						</div>
						<button className="w-full bg-[#FFB000] hover:bg-[#F9DB28] text-[#2D2D2D] font-semibold py-3 px-6 rounded-full text-base focus:outline-none focus:shadow-outline flex items-center justify-center">
							<IoCubeOutline className="text-xl mr-2" />
							Hive
						</button>
						<a
							href="/"
							className="py-3 text-sm text-gray-600 hover:bg-gray-100 flex flex-col items-center"
						>
							<IoHelpOutline className="text-gray-500 text-2xl mb-1" />
							<span className="text-base">Help</span>
						</a>
					</div>
				</div>
			)}
		</header>
	);
};

export default HiveHeader;
