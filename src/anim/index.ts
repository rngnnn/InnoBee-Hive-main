export const editVariants = {
	open: {
		opacity: 1,
		y: 0,
		transition: { type: 'spring', stiffness: 300, damping: 24 },
	},
	closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export const fadeIn = (
	direction: 'left' | 'right' | 'up' | 'down',
	type: string,
	delay: number,
	duration: number,
	exitDuration: number = 0.2
) => {
	return {
		hidden: {
			x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
			y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
			opacity: 0,
		},
		show: {
			x: 0,
			y: 0,
			opacity: 1,
			transition: {
				type: type,
				delay: delay,
				duration: duration,
				ease: 'easeOut',
			},
		},
		exit: {
			x: direction === 'left' ? '100%' : direction === 'right' ? '-100%' : 0,
			y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
			opacity: 0,
			transition: {
				type: 'tween',
				delay: delay,
				duration: exitDuration,
				ease: 'easeIn',
			},
		},
	};
};

export const textVariant = (delay: number) => {
	return {
		hidden: {
			y: -50,
			opacity: 0,
		},
		show: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				duration: 1.25,
				delay: delay,
			},
		},
	};
};
