const AboutMeCard = ({
	item,
}: {
	item: { title: string; subtitle: string; img: string };
}) => {
	const { title, subtitle, img } = item;

	return (
		<div className="text-white text-center flex flex-col items-center justify-center">
			<p className="font-bold text-brown">{title}</p>
			<p className="text-brown">{subtitle}</p>
			<img src={img} alt={title} className="icon w-14 h-10" />
		</div>
	);
};

export default AboutMeCard;
