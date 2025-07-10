import React, {
	useState,
	useEffect,
	useRef,
	Dispatch,
	SetStateAction,
} from 'react';
import {
	FaPaperclip,
	FaPaperPlane,
	FaCheckDouble,
	FaAngleDown,
	FaSmile,
} from 'react-icons/fa';
import Picker, { EmojiClickData } from 'emoji-picker-react';

// Define types/interfaces
interface Message {
	id: number;
	sender: string;
	text: string;
	isOwn: boolean;
	timestamp: string;
}

interface User {
	id: number;
	name: string;
	avatar: string;
	online: boolean;
}

interface MessageBubbleProps {
	message: Message;
	isOwn: boolean;
	timestamp: string;
}

interface UserStatusProps {
	online: boolean;
}

interface UserListItemProps {
	user: User;
	onClick: () => void;
	selected: boolean;
}

interface InputAreaProps {
	input: string;
	setInput: Dispatch<SetStateAction<string>>;
	onSend: () => void;
	onAttachment: () => void;
	onEmojiSelect: (emojiData: EmojiClickData) => void;
	showEmojiPicker: boolean;
	setShowEmojiPicker: Dispatch<SetStateAction<boolean>>;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
	message,
	isOwn,
	timestamp,
}) => {
	return (
		<div
			className={`p-3 rounded-xl mb-3 max-w-[70%] ${
				isOwn ? 'bg-green-100 self-end' : 'bg-gray-100 self-start'
			} shadow-md`}
		>
			<div className="text-sm">{message.text}</div>
			<div className="text-xs text-gray-500 mt-1 flex items-center justify-end">
				{timestamp}
				{isOwn && <FaCheckDouble className="inline-block ml-1 text-yellow-500" />}
			</div>
		</div>
	);
};

const UserStatus: React.FC<UserStatusProps> = ({ online }) => {
	return (
		<div
			className={`w-2 h-2 rounded-full ${
				online ? 'bg-green-500' : 'bg-gray-500'
			} ml-2`}
		/>
	);
};

const UserListItem: React.FC<UserListItemProps> = ({
	user,
	onClick,
	selected,
}) => {
	return (
		<div
			onClick={onClick}
			className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
				selected ? 'bg-gray-100' : ''
			}`}
		>
			<div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3 text-lg">
				{user.avatar}
			</div>
			<div className="flex-grow">{user.name}</div>
			<UserStatus online={user.online} />
		</div>
	);
};

const InputArea: React.FC<InputAreaProps> = ({
	input,
	setInput,
	onSend,
	onAttachment,
	onEmojiSelect,
	showEmojiPicker,
	setShowEmojiPicker,
}) => {
	return (
		<div className="p-3 border-t border-gray-200 flex flex-col bg-white shadow-md">
			<div className="flex items-center">
				<button onClick={onAttachment} className="mr-3 text-lg text-gray-600">
					<FaPaperclip />
				</button>
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type a message..."
					className="flex-grow p-2 border border-gray-300 rounded-lg mr-3"
				/>
				<button
					onClick={() => setShowEmojiPicker(!showEmojiPicker)}
					className="mr-3 text-lg text-gray-600"
				>
					<FaSmile />
				</button>
				<button
					onClick={onSend}
					className="bg-yellow-500 text-white p-2 rounded-lg flex items-center"
				>
					<FaPaperPlane />
				</button>
			</div>
			{showEmojiPicker && (
				<div className="absolute bottom-20 left-0">
					<Picker onEmojiClick={onEmojiSelect} />
				</div>
			)}
		</div>
	);
};

const Messaging = () => {
	const [users, setUsers] = useState<User[]>([
		{ id: 1, name: 'Alice', avatar: 'A', online: true },
		{ id: 2, name: 'Bob', avatar: 'B', online: false },
		{ id: 3, name: 'Charlie', avatar: 'C', online: true },
	]);
	const [selectedUser, setSelectedUser] = useState<User>(users[0]);
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [showScrollDown, setShowScrollDown] = useState(false);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
		setShowScrollDown(false);
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleUserClick = (user: User) => {
		setSelectedUser(user);
		setMessages([]);
	};

	const handleSend = () => {
		if (input.trim()) {
			const newMessage = {
				id: Date.now(),
				sender: 'You',
				text: input,
				isOwn: true,
				timestamp: new Date().toLocaleTimeString(),
			};
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			setInput('');

			const receivedMessage = {
				id: Date.now() + 1,
				sender: selectedUser.name,
				text: `Reply: ${input}`,
				isOwn: false,
				timestamp: new Date().toLocaleTimeString(),
			};
			setMessages((prevMessages) => [...prevMessages, receivedMessage]);
		}
	};

	const handleAttachment = () => {
		alert('Attachment functionality to be implemented.');
	};

	const filteredUsers = users.filter((user) =>
		user.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const element = e.currentTarget;
		if (element.scrollHeight - element.scrollTop > element.clientHeight + 50) {
			setShowScrollDown(true);
		} else {
			setShowScrollDown(false);
		}
	};

	const handleEmojiSelect = (emojiObject: EmojiClickData) => {
		setInput((prevInput) => prevInput + emojiObject.emoji);
	};

	return (
		<div className="flex h-[600px] border border-gray-200 rounded-lg overflow-hidden bg-white shadow-lg">
			<div className="w-[250px] border-r border-gray-200 p-3 overflow-y-auto">
				<input
					type="text"
					placeholder="Search users..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded-lg mb-3"
				/>
				{filteredUsers.map((user) => (
					<UserListItem
						key={user.id}
						user={user}
						onClick={() => handleUserClick(user)}
						selected={user.id === selectedUser.id}
					/>
				))}
			</div>
			<div className="flex-grow flex flex-col">
				<div
					className="flex-grow p-3 overflow-y-auto relative"
					onScroll={handleScroll}
				>
					{messages.map((message) => (
						<MessageBubble
							key={message.id}
							message={message}
							isOwn={message.isOwn}
							timestamp={message.timestamp}
						/>
					))}
					<div ref={messagesEndRef} />
					{showScrollDown && (
						<button
							onClick={scrollToBottom}
							className="absolute bottom-5 right-5 bg-gray-200 p-2 rounded-full shadow-md"
						>
							<FaAngleDown />
						</button>
					)}
				</div>
				<InputArea
					input={input}
					setInput={setInput}
					onSend={handleSend}
					onAttachment={handleAttachment}
					onEmojiSelect={handleEmojiSelect}
					showEmojiPicker={showEmojiPicker}
					setShowEmojiPicker={setShowEmojiPicker}
				/>
			</div>
		</div>
	);
};

export default Messaging;
