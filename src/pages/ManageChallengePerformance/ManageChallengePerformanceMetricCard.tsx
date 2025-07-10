const MetricCard = ({
	title,
	value,
	colorClass = 'text-gray-700',
}: {
	title: string;
	value: string | number;
	colorClass?: string;
}) => {
	return (
		<div className="bg-white shadow-md rounded-lg p-6">
			<h3 className="text-xl font-semibold mb-2">{title}</h3>
			<p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
		</div>
	);
};

export default MetricCard;
