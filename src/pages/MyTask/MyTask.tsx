import { useState } from 'react';

import CardWithImage from '../../components/CardWithImage';
import Dropdown from '../../components/Dropdown';

import { challenge, myTaskDropdownLinks } from '../../constants';

const MyTask = () => {
	const [showDropDwon, setShowDropdown] = useState(false);
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);

	const toggleDropdown = (index: number) => {
		setCurrentIndex(index);
		setShowDropdown((prev) => !prev);
	};

	return (
		<>
			<h4 className="y-3 font-semibold text-xl">My Tasks</h4>
			<p className="py-6">
				Access the challenges you accepted to participate in as a judge. During
				the Judging stage, you can review the submissions and score them based
				on the challenge's judging criteria.
			</p>
			<div className="w-full flex flex-wrap">
				{challenge?.map((challenge, index) => (
					<CardWithImage
						key={index}
						data={challenge}
						index={index}
						currentIndex={currentIndex}
						showDropDwon={showDropDwon}
						toggleDropdown={toggleDropdown}
						link="/judging/my-tasks"
						linkTitle="Start Judging"
						title="Judging"
						dropdown={<Dropdown dropdownLinks={myTaskDropdownLinks} />}
					/>
				))}
			</div>
			<div className="flex-center justify-center">
				<button className="px-6 py-1 rounded-full border-1 border-brown">
					Load more
				</button>
			</div>
			<div className="mb-8"></div>{' '}
			{/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
		</>
	);
};

export default MyTask;
