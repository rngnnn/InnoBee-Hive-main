import { handleError } from 'src/helpers/ErrorHandler';
import axios from './axiosInstance';

export const loginAPI = async (email: string, password: string) => {
	try {
		const data = await axios.post('/auth/login', {
			email,
			password,
		});
		return data;
	} catch (error) {
		handleError(error);
	}
};

export const registerAPI = async (
	name: string,
	email: string,
	password: string
) => {
	try {
		const data = await axios.post('/auth/register', {
			name,
			email,
			password,
		});
		return data;
	} catch (error) {
		handleError(error);
	}
};
