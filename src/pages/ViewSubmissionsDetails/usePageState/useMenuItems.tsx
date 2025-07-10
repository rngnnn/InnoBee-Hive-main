import { FaRegBookmark, FaRegTrashAlt } from 'react-icons/fa';
import { FiFlag, FiThumbsDown, FiThumbsUp, FiTrash2 } from 'react-icons/fi';
import { GoPlusCircle } from 'react-icons/go';
import { GrTrophy } from 'react-icons/gr';
import { IoBulbOutline, IoDocumentTextOutline, IoWarningOutline } from 'react-icons/io5';
import { LuDownload } from 'react-icons/lu';
import { TbGavel } from 'react-icons/tb';
import { VscSettings } from 'react-icons/vsc';
import { DashboardHeaderMenuItem } from 'src/components/bee-interface/DashboardHeader';

export default function useMenuItems(userRole: string = 'manager') {
	// Different menu items based on user role
	const menuItems: DashboardHeaderMenuItem[] =
		userRole === 'judge'
			? [
					{
						icon: <LuDownload className="text-xl" />,
						key: 'export',
						label: 'Export',
						subItems: [
							{
								icon: <IoDocumentTextOutline className="!text-lg" />,
								key: 'xlsx',
								label: 'Export as .XLSX',
								onClick: () => {
									// TODO: implement export votes as xlsx
								},
							},
							{
								icon: <IoDocumentTextOutline className="!text-lg" />,
								key: 'pdf',
								label: 'Export as .PDF',
								onClick: () => {
									// TODO: implement export votes as pdf
								},
							},
						],
					},
					{
						icon: <IoDocumentTextOutline className="text-xl" />,
						key: 'reset-score',
						label: 'Reset Score',
						onClick: () => {
							// Reset all criteria scores to 0
							const allCriteria = document.querySelectorAll(
								'input[type="range"]'
							);
							allCriteria.forEach((element) => {
								const input = element as HTMLInputElement;
								input.value = '0';
								// Trigger the change event to update the state
								input.dispatchEvent(new Event('change', { bubbles: true }));
							});

							// Reset all comments
							const allComments = document.querySelectorAll('textarea');
							allComments.forEach((element) => {
								const textarea = element as HTMLTextAreaElement;
								textarea.value = '';
								textarea.dispatchEvent(new Event('change', { bubbles: true }));
							});
						},
					},
					{
						icon: <IoBulbOutline className="text-xl" />,
						key: 'view-challenge',
						label: 'View Challenge',
						onClick: () => {
							// Get challenge ID from URL
							const challengeId = window.location.pathname.split('/')[3];
							// Navigate to challenge details
							window.location.href = `/my-challenges/${challengeId}`;
						},
					},
			  ]
			: [
					{
						icon: <TbGavel className="text-xl" strokeWidth="1.5" />,
						key: 'assign-judges',
						label: 'Assign Judges',
						onClick: () => {
							// TODO: implement assign judges
						},
						color: 'brown',
					},
					{
						icon: <LuDownload className="text-xl" />,
						key: 'export-votes',
						label: 'Export Votes',
						subItems: [
							{
								icon: <IoDocumentTextOutline className="!text-lg" />,
								key: 'csv',
								label: 'Export as .CSV',
								onClick: () => {
									// TODO: implement export votes as csv
								},
							},
							{
								icon: <IoDocumentTextOutline className="!text-lg" />,
								key: 'xlsx',
								label: 'Export as .XLSX',
								onClick: () => {
									// TODO: implement export votes as xlsx
								},
							},
							{
								icon: <IoDocumentTextOutline className="!text-lg" />,
								key: 'pdf',
								label: 'Export as .PDF',
								onClick: () => {
									// TODO: implement export votes as pdf
								},
							},
						],
					},
					{
						icon: <FiFlag />,
						key: 'mark',
						label: 'Mark',
						subItems: [
							{
								icon: <VscSettings className="!text-lg" />,
								key: 'enable-voting',
								label: 'Enable voting',
								onClick: () => {
									// TODO: implement enable voting
								},
							},
							{
								icon: <FiThumbsUp className="!text-lg" />,
								key: 'eligible',
								label: 'Eligible',
								onClick: () => {
									// TODO: implement mark as eligible
								},
							},
							{
								icon: <FiThumbsDown className="!text-lg" />,
								key: 'ineligible',
								label: 'Ineligible',
								onClick: () => {
									// TODO: implement mark as ineligible
								},
							},
							{
								icon: <IoWarningOutline className="!text-lg" />,
								key: 'not-verified',
								label: 'Not verified',
								onClick: () => {
									// TODO: implement mark as not verified
								},
							},
						],
					},
					{
						icon: <FaRegBookmark />,
						key: 'labels',
						label: 'Labels',

						subItems: [
							{
								icon: <GoPlusCircle className="!text-lg" />,
								key: 'add-new',
								label: 'Add new',
								onClick: () => {
									// TODO: implement add new label
								},
							},
							{
								icon: <FaRegBookmark className="!text-lg" />,
								key: 'c-label-1',
								label: 'Custom label 1',
								onClick: () => {
									// TODO: implement custom labels
								},
							},
							{
								icon: <FaRegBookmark className="!text-lg" />,
								key: 'c-label-2',
								label: 'Custom label 2',
								onClick: () => {},
							},
							{
								icon: <FaRegBookmark className="!text-lg" />,
								key: 'c-label-3',
								label: 'Custom label 3',
								onClick: () => {},
							},
							{
								icon: <FiTrash2 className="!text-lg" />,
								key: 'remove-label',
								label: 'Remove label',
								onClick: () => {
									// TODO: implement remove label
								},
							},
						],
					},
					{
						icon: <GrTrophy strokeWidth="0.1"/>,
						key: 'winner',
						label: 'Winner',

						subItems: [
							{
								key: 'winner',
								label: 'Winner',
								onClick: () => {
									// TODO: implement set as winner
								},
							},
							{
								key: '1-place',
								label: '1st place',
								onClick: () => {
									// TODO: implement set as 1st place
								},
							},
							{
								key: '2-place',
								label: '2nd place',
								onClick: () => {
									// TODO: implement set as 2nd place
								},
							},
							{
								key: '3-place',
								label: '3rd place',
								onClick: () => {
									// TODO: implement set as 3rd place
								},
							},
							{
								key: '4-place',
								label: '4th place',
								onClick: () => {
									// TODO: implement set as 4th place
								},
							},
							{
								key: '5-place',
								label: '5th place',
								onClick: () => {
									// TODO: implement set as 5th place
								},
							},
							{
								key: 'edit-types',
								label: 'Edit Winner Types',
								onClick: () => {
									// TODO: implement edit winner types
								},
							},
						],
					},
					{
						icon: <LuDownload className="text-xl" />,
						key: 'export',
						label: 'Export',

						subItems: [
							{
								icon: <IoDocumentTextOutline className="!text-lg" />,
								key: 'csv',
								label: 'Export as .CSV',
								onClick: () => {
									// TODO: implement export as csv
								},
							},
							{
								icon: <IoDocumentTextOutline className="!text-lg" />,
								key: 'xlsx',
								label: 'Export as .XLSX',
								onClick: () => {
									// TODO: implement export as xlsx
								},
							},
							{
								icon: <IoDocumentTextOutline className="!text-lg" />,
								key: 'pdf',
								label: 'Export as .PDF',
								onClick: () => {
									// TODO: implement export as pdf
								},
							},
						],
						color: 'yellow',
					},
			  ];

	return menuItems;
}
