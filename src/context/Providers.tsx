import { FormProvider } from 'src/pages/ManageChallengeSubmissionForm/context/formdata';
import { ToastProvider } from 'src/components/ui/toast';
import SideBarState from 'src/context/SideBarState';
import { UserProvider } from './useAuth';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<SideBarState>
			<UserProvider>
				<ToastProvider>
					<FormProvider>{children}</FormProvider>
				</ToastProvider>
			</UserProvider>
		</SideBarState>
	);
};

export default Providers;
