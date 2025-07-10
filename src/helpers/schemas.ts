import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number')
		.regex(
			/[^A-Za-z0-9]/,
			'Password must contain at least one special character'
		),
});

export const registerSchema = loginSchema.extend({
	name: z.string().min(1, 'Name is required'),
});

export const profileSchema = z
	.object({
		username: z.string().nonempty('Username is required'),
		firstName: z.string().nonempty('First name is required'),
		lastName: z.string().nonempty('Last name is required'),
		email: z.string().email('Invalid email format'),
		phoneNumber: z.string().min(1, 'Phone number is required'),
		previousPassword: z.string().nonempty('Previous password is required'),
		changePassword: z.string().nonempty('New password is required').min(8),
		repeatPassword: z.string().nonempty('Repeat password is required').min(8),
		jobTitle: z.string().nonempty('Job title is required'),
		aboutMe: z.string().nonempty('About me is required'),
		country: z.string().nonempty('Country is required'),
		timezone: z.string().nonempty('Timezone is required'),
	})
	.superRefine(({ repeatPassword, changePassword }, ctx) => {
		if (repeatPassword !== changePassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords did not match',
				path: ['repeatPassword'],
			});
		}
	});
