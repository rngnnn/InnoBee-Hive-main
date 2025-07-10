import { useState } from 'react';

import { IoMdSearch } from 'react-icons/io';

const PurchaseHistoryPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState('');
	const data = [
		{
			id: 1,
			description: 'Website design services',
			billedTo: 'John Doe',
			createdOn: '2024-01-01',
			status: 'Completed',
		},
		{
			id: 2,
			description: 'Mobile app development',
			billedTo: 'Jane Smith',
			createdOn: '2024-02-15',
			status: 'Pending',
		},
		// Add more dummy data as needed
	];

	const filteredData = data.filter((item) => {
		return (
			item.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(!filterStatus || item.status === filterStatus)
		);
	});

	return (
		<>
			<h4 className="py-3 font-semibold text-xl">Purchase History</h4>
			<div className="w-full my-3 shadow-md rounded-lg p-4 h-[70vh] bg-white">
				<h6 className="font-semibold ">Purchase History</h6>
				<div className="flex gap-4 py-3 flex-wrap-reverse">
					<div className="flex flex-col">
						<label htmlFor="search" className="text-sm font-semibold">
							Search for invoice ID
						</label>
						<div className="flex-center md:w-[350px] border-1 border-gray-300 rounded px-2 py-1">
							<IoMdSearch />
							<input
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								type="search"
								name=""
								id="search"
								className="flex-1 pl-2 text-sm outline-none"
								placeholder="3256-00567"
							/>
						</div>
					</div>
					<div className="flex flex-col">
						<label htmlFor="search" className="text-sm font-semibold">
							Filter by type
						</label>
						<select
							className="flex-center text-sm border-1 border-gray-300 rounded  p-1 text-gray-400"
							value={filterStatus}
							onChange={(e) => setFilterStatus(e.target.value)}
						>
							<option className="">Any item type</option>
							<option value="Completed">Completed</option>
							<option value="Pending">Pending</option>
						</select>
					</div>
					<div className="flex flex-col">
						<label htmlFor="search" className="text-sm font-semibold">
							Filter by date
						</label>
						<select className="flex-center text-sm border-1 border-gray-300 rounded  p-1 text-gray-400">
							<option className="">All dates</option>
						</select>
					</div>
				</div>
				<div className="overflow-x-auto ">
					<table className="min-w-full border-collapse">
						<thead>
							<tr className="border-b border-gray-300">
								<th className="p-2 w-2/5 text-left">Description</th>
								<th className="p-2 w-1/5 text-left">Billed To</th>
								<th className="p-2 w-1/5 text-left">Created On</th>
								<th className="p-2 w-1/5 text-left">Status</th>
								<th className="p-2 w-1/5 text-left">Action</th>
							</tr>
						</thead>
						<tbody>
							{filteredData.length > 0 ? (
								filteredData.map((item) => (
									<tr key={item.id} className="">
										<td className="p-2 whitespace-nowrap">
											{item.description}
										</td>
										<td className="p-2 whitespace-nowrap">{item.billedTo}</td>
										<td className="p-2 whitespace-nowrap">{item.createdOn}</td>
										<td className="p-2 whitespace-nowrap">{item.status}</td>
										<td className="p-2 whitespace-nowrap">
											{/* Add actions like edit or delete here */}
											<button className="text-brown">Edit</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={5}
										className="p-4 text-center text-gray-500 py-6 border-y-1 border-gray-300"
									>
										No results found
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default PurchaseHistoryPage;
