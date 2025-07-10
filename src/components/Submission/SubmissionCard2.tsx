import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { IoSettingsOutline, IoStarOutline } from 'react-icons/io5';
import { MdOutlineArrowDropDown, MdOutlineArrowRightAlt } from 'react-icons/md';
import { fadeIn } from '../../anim';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import SubmissionDropdown from './SubmissionDropdown';

interface SubmissionProps {
	submission: {
		id: number;
		logo: string;
		challengeImg: string;
		title: string;
		companyName: string;
		description: string;
		score: number;
	};
	index: number;
}

const SubmissionCard2 = ({ submission, index }: SubmissionProps) => {
	const [showDropDown, setShowDropDown] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useOnClickOutside([dropdownRef, buttonRef], () => setShowDropDown(false));

	return (
		<motion.div
			variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
			initial="hidden"
			animate="show"
		>
			<div className="shadow rounded-lg bg-white h-full relative">
				<div className="h-2 w-full bg-gradient-to-r from-yellow-300 to-pri-color rounded" />

				<div className="w-full h-52 relative">
					<img
						src={submission.logo}
						alt=""
						className="w-14 h-14 absolute -bottom-4 left-4 rounded-full object-cover"
					/>
					<img
						src={submission.challengeImg}
						alt=""
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex flex-col w-full sm:px-6 sm:py-8 px-3 py-5 rounded-b-lg gap-5">
					<div className="flex-center-between">
						<h4 className="font-semibold text-sm">{submission.companyName}</h4>
						<div className="relative">
							<button
								ref={buttonRef}
								className="flex-center gap-1"
								onClick={() => setShowDropDown(!showDropDown)}
							>
								<IoSettingsOutline />
								<AnimatePresence>
									<motion.span
										initial={{ rotate: 0 }}
										animate={{ rotate: showDropDown ? 180 : 0 }}
										exit={{ rotate: 0 }}
										transition={{ duration: 0.3 }}
									>
										<MdOutlineArrowDropDown />
									</motion.span>
								</AnimatePresence>
							</button>

							<AnimatePresence>
								{showDropDown && (
									<SubmissionDropdown
										submissionDropdownRef={
											dropdownRef as React.RefObject<HTMLDivElement>
										}
										submission={submission}
									/>
								)}
							</AnimatePresence>
						</div>
					</div>
					<p>{submission.description}</p>
					<div className="flex-center-between">
						<p className="flex-center gap-1 text-sm">
							<IoStarOutline />{' '}
							<strong className="text-base">{submission.score}</strong>/100
						</p>
						<Link
							to={`/my-challenges/view-submissions/1/details?id=${submission.id}`}
							className="flex-center gap-1"
						>
							<p className="underline text-sm font-semibold">View Details</p>{' '}
							<MdOutlineArrowRightAlt />
						</Link>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default SubmissionCard2;
