import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
} from 'react';

interface UpdateType {
	uuid: string;
	title: string;
	content: string;
	scheduledTime: string | number | Date | null;
	status: 'draft' | 'published' | 'scheduled';
}

interface UpdateContextType {
	updatesData: UpdateType[];
	setUpdatesData: Dispatch<SetStateAction<UpdateType[]>>;
	addNewUpdate: () => void;
	updateUpdate: (uuid: string, newData: Partial<UpdateType>) => void;
	deleteUpdate: (uuid: string) => void;
}

export const UpdateContext = createContext<UpdateContextType | undefined>(
	undefined
);

export const UpdateProvider = ({ children }: { children: ReactNode }) => {
	const [updatesData, setUpdatesData] = useState<UpdateType[]>([]);

	const addNewUpdate = () => {
		const newUpdate: UpdateType = {
			uuid: crypto.randomUUID(),
			title: 'New Update',
			content: '',
			scheduledTime: null,
			status: 'draft',
		};
		setUpdatesData((prev) => [...prev, newUpdate]);
	};

	const updateUpdate = (uuid: string, newData: Partial<UpdateType>) => {
		setUpdatesData((prev) =>
			prev.map((update) =>
				update.uuid === uuid ? { ...update, ...newData } : update
			)
		);
	};

	const deleteUpdate = (uuid: string) => {
		setUpdatesData((prev) => prev.filter((update) => update.uuid !== uuid));
	};

	return (
		<UpdateContext.Provider
			value={{
				updatesData,
				setUpdatesData,
				addNewUpdate,
				updateUpdate,
				deleteUpdate,
			}}
		>
			{children}
		</UpdateContext.Provider>
	);
};

export const useUpdateData = (): UpdateContextType => {
	const context = useContext(UpdateContext);
	if (!context) {
		throw new Error('useUpdateData must be used within an UpdateProvider');
	}
	return context;
};
