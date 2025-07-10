import { Button, Dropdown } from 'antd';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

export default function DashboardButton({
	variant = 'default',
	icon,
	className,
	href,
	onClick,
	children,
	dropdownItems,
	dropdownPlacement,
	disabled,
}) {
	const [open, setOpen] = useState(false);

	const colorClasses = {
		default:
			'!text-brown text-brown !border-[#d9d9d9] !outline-[#d9d9d9] !ring-[#d9d9d9] [&_.ant-wave]:!text-[#000000]',
		brown:
			'!text-white !bg-neutral-800 !border-none !outline-[#d9d9d9] !ring-[#d9d9d9] [&_.ant-wave]:!text-[#000000]',
		yellow:
			'!text-brown !bg-yellow-dark !border-none !outline-[#d9d9d9] !ring-[#d9d9d9] [&_.ant-wave]:!text-[#000000]',
	}[variant];

	const disabledClasses =
		'disabled:!bg-white disabled:!text-gray-400 disabled:!border-gray-300 disabled:!border-solid';

	if (dropdownItems) {
		return (
			<Dropdown
				menu={{
					items: dropdownItems,
				}}
				open={open}
				onOpenChange={setOpen}
				trigger={['click']}
				placement={dropdownPlacement}
			>
				<Button
					disabled={disabled}
					onClick={onClick}
					href={href}
					icon={icon}
					rootClassName={twMerge(
						'rounded-full !gap-0 !inline-flex !items-center',
						colorClasses,
						className,
						disabled && disabledClasses
					)}
					classNames={{ icon: '!mr-2 text-lg flex items-center' }}
				>
					{children}
					{
						<motion.span
							initial={{ rotate: 0 }}
							animate={{ rotate: open ? 180 : 0 }}
							exit={{ rotate: 0 }}
							transition={{ duration: 0.3 }}
						>
							<span className="ml-0.5 text-lg flex items-center">
								<MdOutlineArrowDropDown />
							</span>
						</motion.span>
					}
				</Button>
			</Dropdown>
		);
	}

	return (
		<Button
			disabled={disabled}
			onClick={onClick}
			href={href}
			icon={icon}
			rootClassName={twMerge(
				'rounded-full !gap-0 !inline-flex !items-center',
				colorClasses,
				className,
				disabled &&
					'disabled:!bg-white disabled:!text-gray-400 disabled:!border-gray-300 disabled:!border-solid'
			)}
			classNames={{ icon: '!mr-2 text-xl flex items-center' }}
		>
			{children}
		</Button>
	);
}
