import React from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import createdIcon from '../../assets/images/ComingSoonModal.png';
import { Button } from 'src/components/buttons/Button';
import { goBack } from "src/helpers";	

// Define Props interface
interface NoMatchProps {
	onCloseModal: () => void;
	openModal: boolean;
}

const NoMatch: React.FC<NoMatchProps> = ({ onCloseModal, openModal }) => {
	const navigate = useNavigate();

	const handleNavigateToSuggestImprovement = () => {
		navigate('/need-help/improvement');
	};

	return (
		<>
			<Modal
				open={openModal}
				onCancel={onCloseModal}
				centered
				mask={false}
				footer={null}
				closable={false}
			>
				<div className="flex flex-col items-center p-4 gap-2 max-sm:p-0 w-full">
					<img
						src={createdIcon}
						alt="Something awesome is coming!"
						width={150}
						height={150}
					/>
					<p className="text-lg font-bold mt-6">Something awesome is coming!</p>
					<div className="text-center text-base md:whitespace-nowrap ">
						We're working hard like bees to bring you something amazing!
						<br className="hidden md:inline" />
						Bee positive and help us improve InnoBee!
						<br />
						<div
							className="flex items-center gap-1 justify-center"
							onClick={handleNavigateToSuggestImprovement}
						>
							<span className="text-brown font-medium border-b-brown border-b-2 cursor-pointer">
								Suggest improvement
							</span>{' '}
							<HiOutlineArrowNarrowRight />
						</div>{' '}
					</div>
					<div className="flex flex-col gap-3 py-4"></div>

					<Button
						variant="neutral"
						className="w-full text-[1rem]"
						onClick={goBack}
						disabled={false}
						iconLeft={null}
						iconRight={null}
						iconClass={null}
						loading={false}
						ariaLabel="Go back"
						style={null}
					>
						Go back
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default NoMatch;
