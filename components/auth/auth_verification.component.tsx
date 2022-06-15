import Link from 'next/link';
import { useAuthContext } from '@lib/auth.context';
import Layout from '@components/layout/layout.component';

interface IAuthVerificationProps {
	children?: React.ReactNode;
	fallback?: JSX.Element;
}

const AuthVerification: React.FC<IAuthVerificationProps> = ({ children, fallback }) => {
	const { activeUser } = useAuthContext();

	return activeUser ? (
		<>{children}</>
	) : (
		fallback || (
			<Layout>
				<div className='flex items-center justify-center py-28'>
					<Link href='/signin'>
						<a className='rounded-xl border-2 border-solid border-primaryRed px-4 py-1'>Permission denied. Click here to sign in.</a>
					</Link>
				</div>
			</Layout>
		)
	);
};

export default AuthVerification;
