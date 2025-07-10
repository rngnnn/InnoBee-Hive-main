import { useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';

// Define interface for table data
interface DataType {
	key: string;
	date: string;
	to: string;
	requestDetails: string;
	status: 'Done' | 'Declined' | 'In progress';
}

// Explicitly type columns array
const columns: TableProps<DataType>['columns'] = [
	{
		title: 'Request Date',
		dataIndex: 'date',
	},
	{
		title: 'To',
		dataIndex: 'to',
		sorter: (a: DataType, b: DataType) => a.to.localeCompare(b.to),
		width: '20%',
	},
	{
		title: 'Request details',
		dataIndex: 'requestDetails',
		sorter: (a: DataType, b: DataType) =>
			a.requestDetails.localeCompare(b.requestDetails),
		width: '40%',
	},
	{
		title: 'Status',
		dataIndex: 'status',
		render: (_, record: DataType) => {
			const { status } = record;
			return (
				<>
					{status === 'Declined' && (
						<p className={`px-4 py-1 rounded-sm bg-red-100 text-red-500 w-fit`}>
							{status}
						</p>
					)}
					{status === 'Done' && (
						<p
							className={`px-4 py-1 rounded-sm bg-green-100 text-green-500 w-fit`}
						>
							{status}
						</p>
					)}
					{status === 'In progress' && (
						<p className={`px-4 py-1 rounded-sm bg-blue-100 text-brown w-fit`}>
							{status}
						</p>
					)}
				</>
			);
		},
	},
];

// Explicitly type data array
const data: DataType[] = [
	{
		key: '1',
		date: 'Jan 24, 2017',
		to: 'P&G Innovation Lab Helsinki',
		requestDetails:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint eligendi labore itaque cum vitae beatae at explicabo ex, nemo autem nobis quae eius deleniti tenetur eveniet molestiae qui ducimus aliquam.',
		status: 'Done',
	},
	{
		key: '2',
		date: 'Jan 24, 2017',
		to: 'P&G Innovation Lab Helsinki',
		requestDetails:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint eligendi labore itaque cum vitae beatae at explicabo ex, nemo autem nobis quae eius deleniti tenetur eveniet molestiae qui ducimus aliquam.',
		status: 'Done',
	},
	{
		key: '3',
		date: 'Jan 24, 2017',
		to: 'FoodTech Aces',
		requestDetails:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint eligendi labore itaque cum vitae beatae at explicabo ex, nemo autem nobis quae eius deleniti tenetur eveniet molestiae qui ducimus aliquam.',
		status: 'Declined',
	},
	{
		key: '4',
		date: 'Jan 24, 2017',
		to: 'OpenAI Research Center',
		requestDetails:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint eligendi labore itaque cum vitae beatae at explicabo ex, nemo autem nobis quae eius deleniti tenetur eveniet molestiae qui ducimus aliquam.',
		status: 'In progress',
	},
];

// Type onChange parameters
const onChange: TableProps<DataType>['onChange'] = (
	pagination,
	filters,
	sorter,
	extra
) => {
	console.log('params', pagination, filters, sorter, extra);
};

const MyRequests = () => {
	const [currentStage, setCurrentStage] = useState('All');
	const [sortBy, setSortBy] = useState('Newest');

	const listSort = ['Newest', 'Oldest'];

	const stage = ['All', 'Approved', 'Pending', 'Decline'];

	const toggleSort = (sortItem: string) => {
		setSortBy(sortItem);
	};
	const toggleStage = (stageItem: string) => {
		setCurrentStage(stageItem);
	};

	return (
		<>
			<h4 className="y-3 font-semibold text-xl">My Requests</h4>
			<p className="py-6">
				Review the requests you sent to other teams and users to collaborate on
				innovative challenges.
			</p>
			<div className="w-full">
				<form className="max-w-96 w-full bg-white shadow-md rounded-full flex-1 flex-row flex-center-between px-3 h-10 text-gray-400 max-lg:hidden ">
					{' '}
					<input
						type="search"
						placeholder="Search by title or keyword"
						className="flex-1 outline-none border-none text-sm"
					/>{' '}
					<button type="submit" className="bg-white text-gray-400 p-0 m-0">
						<IoSearchOutline />
					</button>
				</form>
				<div className="w-full py-6">
					<h6 className="text-gray-500 font-medium pb-1">Stage</h6>
					<div className="w-full flex-center gap-3 flex-wrap py">
						{stage?.map((stageItem, index) => (
							<p
								key={index}
								onClick={() => toggleStage(stageItem)}
								className={`px-4 py-1 rounded-full shadow cursor-pointer hover:font-semibold transition-all bg-white text-gray-500 ${
									currentStage === stageItem && 'border-1 border-brown'
								}`}
							>
								{stageItem}
							</p>
						))}
					</div>
					<h6 className="text-gray-500 font-medium pb-1 pt-4">Order by</h6>
					<div className="w-full flex-center gap-3 flex-wrap py">
						{listSort?.map((sortItem, index) => (
							<p
								key={index}
								onClick={() => toggleSort(sortItem)}
								className={`px-4 py-1 rounded-full shadow cursor-pointer hover:font-semibold transition-all bg-white text-gray-500 ${
									sortBy === sortItem && 'border-1 border-brown'
								}`}
							>
								{sortItem}
							</p>
						))}
					</div>
				</div>
				<p
					className={`px-6 py-1 rounded-full shadow cursor-pointer hover:font-semibold transition-all text-white bg-brown w-fit
                 
               `}
				>
					Apply filter
				</p>
			</div>
			<div className="py-8">
				<Table columns={columns} dataSource={data} onChange={onChange} />
			</div>
		</>
	);
};

export default MyRequests;
