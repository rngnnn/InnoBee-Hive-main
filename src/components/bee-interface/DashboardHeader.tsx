import { ReactNode, useState } from 'react';
import { HiMiniArrowLongLeft } from 'react-icons/hi2';
import { IoMenu } from 'react-icons/io5'; // Import the hamburger menu icon
import { Link } from 'react-router-dom';
import DashboardButton from '../bee-ui/DashboardButton';

type Props = {
	title: string;
	menuItems?: DashboardHeaderMenuItem[];
	goBackLink?: string;
};

export type DashboardHeaderMenuItem = {
	icon: ReactNode;
	key: string;
	label: string;
	color?: 'default' | 'brown' | 'yellow';
	disabled?: boolean;
} & DashboardItemFunctionality;

export type DashboardHeaderMenuSubItem = {
	key: string;
	label: string;
	icon?: ReactNode;
	disabled?: boolean;
} & DashboardItemFunctionality;

export type DashboardItemFunctionality =
	| {
			link: string;
			onClick?: never;
			subItems?: never;
	  }
	| {
			link?: never;
			onClick: () => void;
			subItems?: never;
	  }
	| { link?: never; onClick?: never; subItems: DashboardHeaderMenuSubItem[] };

export default function DashboardHeader({
	goBackLink,
	title,
	menuItems,
}: Props) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="flex sticky top-0 bg-gray-100 w-full pt-8 pb-4">
			<h4 className="font-semibold text-xl">{title}</h4>
			<div className="flex ml-auto gap-2 items-center">
				{goBackLink && (
					<Link
						to={goBackLink}
						className="font-semibold mr-1 flex items-center"
					>
						<HiMiniArrowLongLeft className="text-2xl mr-1 mt-0.5" />
						Go Back
					</Link>
				)}

				{/* Hamburger Menu Icon (Visible on small screens) */}
				{menuItems && (
					<div className="sm:hidden flex items-center">
						<button
							onClick={toggleMenu}
							className="focus:outline-none"
							aria-label="Toggle Menu"
						>
							<IoMenu className="text-3xl cursor-pointer" />
						</button>

						{/* Dropdown Menu (Conditionally Rendered) */}
						{isMenuOpen && (
							<div className="absolute top-full right-0 bg-white shadow-md rounded-lg mt-2 py-2 w-56">
								{menuItems.map((item, index) => (
									<div key={index} className="px-4 py-2 hover:bg-gray-100">
										<DashboardButton
											key={item.key}
											icon={item.icon}
											onClick={item.onClick}
											href={item.link}
											variant={item.color}
											dropdownItems={item?.subItems?.map((x) => ({
												key: x.key,
												label: x.link ? (
													<Link
														to={x.link}
														className="flex items-center gap-2 px-4 hover:bg-slate-100 transition-all py-1"
													>
														{x.label}
													</Link>
												) : (
													<div className="flex items-center gap-2 px-4 hover:bg-slate-100 transition-all py-1">
														{x.label}
													</div>
												),
												onClick: x.onClick,
												icon: x.icon,
												disabled: x.disabled,
											}))}
											dropdownPlacement="topRight"
											disabled={item.disabled}
										>
											{item.label}
										</DashboardButton>
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{/* Original Buttons (Hidden on small screens) */}
				{menuItems && (
					<div className="hidden sm:flex gap-2 items-center">
						{menuItems.map((item, index) => (
							<DashboardButton
								key={index}
								icon={item.icon}
								onClick={item.onClick}
								href={item.link}
								variant={item.color}
								dropdownItems={item?.subItems?.map((x) => ({
									key: x.key,
									label: x.link ? (
										<Link
											to={x.link}
											className="flex items-center gap-2 px-0 hover:bg-slate-100 transition-all py-1"
										>
											{x.label}
										</Link>
									) : (
										<div className="flex items-center gap-2 px-0 hover:bg-slate-100 transition-all py-1">
											{x.label}
										</div>
									),
									onClick: x.onClick,
									icon: x.icon,
									disabled: x.disabled,
								}))}
								dropdownPlacement="topRight"
								disabled={item.disabled}
							>
								{item.label}
							</DashboardButton>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
