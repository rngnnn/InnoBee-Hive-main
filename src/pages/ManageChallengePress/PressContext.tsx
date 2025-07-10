import { createContext, useContext, useState } from 'react';

export interface PressItem {
	uuid: string;
	title: string;
	sourceUrl: string;
	document: any;
	image: any;
	dateCreated: string;
	description: string;
}

interface PressContextType {
	pressItems: PressItem[];
	setPressItems: React.Dispatch<React.SetStateAction<PressItem[]>>;
	addNewPressItem: () => void;
	updatePressItem: (uuid: string, newData: Partial<PressItem>) => void;
	deletePressItem: (uuid: string) => void;
}

export const PressContext = createContext<PressContextType | undefined>(
	undefined
);

export const PressProvider = ({ children }: { children: React.ReactNode }) => {
	const [pressItems, setPressItems] = useState<PressItem[]>([]);

	const addNewPressItem = () => {
		const newPressItem = {
			uuid: crypto.randomUUID(),
			title: 'New Press Item',
			sourceUrl: '',
			document: null, // For document file
			image: null, // For image file
			dateCreated: new Date().toISOString(),
			description: '',
		};
		setPressItems((prev) => [...prev, newPressItem]);
	};

	const updatePressItem = (uuid: string, newData: Partial<PressItem>) => {
		setPressItems((prev) =>
			prev.map((pressItem) =>
				pressItem.uuid === uuid ? { ...pressItem, ...newData } : pressItem
			)
		);
	};

	const deletePressItem = (uuid: string) => {
		setPressItems((prev) =>
			prev.filter((pressItem) => pressItem.uuid !== uuid)
		);
	};

	return (
		<PressContext.Provider
			value={{
				pressItems,
				setPressItems,
				addNewPressItem,
				updatePressItem,
				deletePressItem,
			}}
		>
			{children}
		</PressContext.Provider>
	);
};

export const usePressData = () => {
	const context = useContext(PressContext);
	if (!context) {
		throw new Error('PressData must be used within a PressProvider');
	}
	return context;
};
