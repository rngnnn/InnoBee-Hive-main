import React, {
	createContext,
	useEffect,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
} from 'react';

interface SideBarContextType {
	isSideBarActive: boolean;
	setIsSideBarActive: Dispatch<SetStateAction<boolean>>;
	isLargeScreen: boolean;
}

export const SideBarContext = createContext<SideBarContextType>({
	isSideBarActive: true,
	setIsSideBarActive: () => {
		console.warn('setIsSideBarActive called outside of Provider');
	},
	isLargeScreen:
		typeof window !== 'undefined' ? window.innerWidth >= 1024 : false,
});

const SideBarState = ({ children }: { children: ReactNode }) => {
	const [isSideBarActive, setIsSideBarActive] = useState(true);
	const [isLargeScreen, setIsLargeScreen] = useState(() =>
		typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
	);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handleResize = () => {
			setIsLargeScreen(window.innerWidth >= 1024);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const value: SideBarContextType = {
		isSideBarActive,
		setIsSideBarActive,
		isLargeScreen,
	};

	return (
		<SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
	);
};

export default SideBarState;
