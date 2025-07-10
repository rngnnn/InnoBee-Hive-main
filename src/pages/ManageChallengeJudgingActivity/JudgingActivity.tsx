'use client';
import { useState } from 'react';
import DashboardHeader from 'src/components/bee-interface/DashboardHeader';
import { useMenuItems } from './Usemenuitems';
import { motion } from 'framer-motion';

const JudgingActivity = () => {
	const [activities] = useState([
		{
			date: 'Jan. 12, 2017',
			activity: 'Finalize potential judges list and draft invitations',
		},
		{
			date: 'Jan. 19, 2017',
			activity: 'Send invitations to potential judges list',
		},
		{
			date: 'Feb. 9, 2017',
			activity: 'Send Overview and Criteria document to confirmed judges',
		},
		{ date: 'Dec. 9, 2017', activity: 'Deadline to finalize judges' },
		{
			date: 'Dec. 16, 2017',
			activity: 'Schedule judges training and winner selection calls',
		},
		{
			date: 'Dec. 23, 2017',
			activity: 'Invite judges to challenge page via Judges selection',
		},
		{ date: 'Dec. 30, 2017', activity: 'Post Update announcing judges' },
		{
			date: 'March 10, 2018',
			activity: 'Complete judges training call no later than',
		},
		{
			date: 'April 15, 2018',
			activity: 'Complete internal review of submissions',
		},
	]);
	const menuItems = useMenuItems();

	return (
		<div className="">
			<DashboardHeader title="Manage Challenge" menuItems={menuItems} />
			<br />

			{/* Section Title */}
			<h2 className="text-lg font-semibold mt-4">Judging Activities</h2>

			{/* Info Banner */}
			<div className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
				Here is a list of all the Judging Activities and Projected Dates when
				they take place.
			</div>

			{/* Activities Table */}
			{/* <div className="mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 border-b">Date</th>
              <th className="text-left py-3 px-4 border-b">Activity</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 text-orange-500">{item.date}</td>
                <td className="py-2 px-4">{item.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<div className="mt-4 bg-white shadow-lg rounded-xl overflow-hidden">
					<table className="w-full border-collapse">
						{/* Table Head */}
						<thead className="bg-gray-50 text-gray-700">
							<tr className="border-b">
								<th className="text-left py-3 px-5 font-medium">Date</th>
								<th className="text-left py-3 px-5 font-medium">Activity</th>
							</tr>
						</thead>

						{/* Table Body */}
						<tbody>
							{activities.map((item, index) => (
								<tr
									key={index}
									className="border-b transition hover:bg-gray-100/50"
								>
									<td className="py-3 px-5 text-orange-500 font-semibold">
										{item.date}
									</td>
									<td className="py-3 px-5 text-gray-700">{item.activity}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>
			<br />
			<br />
		</div>
	);
};

export default JudgingActivity;
