import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
import { usePressData } from './PressContext';
import { FiTrash2 } from 'react-icons/fi';
import { PressItem } from './PressContext';

const PressCard = ({ item }: { item: PressItem }) => {
	const { updatePressItem, deletePressItem } = usePressData();
	const [localDateCreated, setLocalDateCreated] = useState(
		item.dateCreated ? new Date(item.dateCreated) : new Date()
	);
	const [localDocument, setLocalDocument] = useState<File | null>(null);
	const [localImage, setLocalImage] = useState<File | null>(null);

	const handleDeleteEvent = () => {
		deletePressItem(item.uuid);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		updatePressItem(item.uuid, { [name]: value });
	};

	const handleDateCreatedChange = (date: Date) => {
		setLocalDateCreated(date);
		updatePressItem(item.uuid, {
			dateCreated: date ? date.toISOString() : undefined,
		});
	};

	const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setLocalDocument(file);
			updatePressItem(item.uuid, { document: file });
		}
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setLocalImage(file);
			updatePressItem(item.uuid, { image: file });
		}
	};

	return (
		<div className="flex sm:flex-row flex-col w-full gap-4">
			<div className="flex flex-col gap-4 bg-white rounded-lg relative p-4 sm:p-6 w-full">
				<div className="absolute top-0 left-0 h-full w-1.5 sm:w-2 rounded-lg rounded-r-none bg-linearGradientToBottom shadow-sm" />
				<h6 className="font-bold text-lg mt-6 sm:mt-2">
					{item?.title || 'New Press Item'}
				</h6>
				<div className="flex flex-col gap-2 w-full">
					<label className="text-sm font-bold" htmlFor="title">
						Title <span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 mb text-sm sm:text-base"
						placeholder="Title"
						id="title"
						name="title"
						value={item?.title || ''}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label className="text-sm font-bold" htmlFor="sourceUrl">
						Source URL <span className="text-red-500">*</span>
					</label>
					<input
						className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 mb text-sm sm:text-base"
						placeholder="Source URL"
						id="sourceUrl"
						name="sourceUrl"
						value={item?.sourceUrl || ''}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label className="text-sm font-bold" htmlFor="document">
						Upload Document
					</label>
					<input
						type="file"
						id="document"
						name="document"
						onChange={handleDocumentUpload}
						className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 mb text-sm sm:text-base"
					/>
					{localDocument && (
						<p className="text-sm text-gray-500">
							Selected document: {localDocument.name}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label className="text-sm font-bold" htmlFor="image">
						Upload Image
					</label>
					<input
						type="file"
						id="image"
						name="image"
						onChange={handleImageUpload}
						className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 mb text-sm sm:text-base"
					/>
					{localImage && (
						<p className="text-sm text-gray-500">
							Selected image: {localImage.name}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label className="text-sm font-bold" htmlFor="dateCreated">
						Date Created <span className="text-red-500">*</span>
					</label>
					{/* Using a simple input type date for now, you can integrate a DatePicker if needed */}
					<input
						type="date"
						id="dateCreated"
						name="dateCreated"
						value={localDateCreated?.toISOString().split('T')[0] || ''}
						onChange={(e) => handleDateCreatedChange(new Date(e.target.value))}
						className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 mb text-sm sm:text-base"
						required
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label className="text-sm font-bold" htmlFor="description">
						Description <span className="text-red-500">*</span>
					</label>
					<textarea
						className="bg-gray-100 w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl outline-none focus:border-pri-color border-1 text-sm sm:text-base"
						placeholder="Description"
						id="description"
						name="description"
						value={item?.description || ''}
						onChange={handleInputChange}
						rows={4}
						required
					/>
				</div>
			</div>
			<div
				className="bg-white rounded-lg p-3 sm:p-4 h-fit text-2xl cursor-pointer flex items-center justify-center"
				onClick={handleDeleteEvent}
				style={{ color: 'black' }}
			>
				<FiTrash2 />
			</div>
		</div>
	);
};

export default PressCard;
