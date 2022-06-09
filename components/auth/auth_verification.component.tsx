import Link from 'next/link';
import { useAuthContext } from '@lib/auth.context';

interface IAuthVerificationProps {
	children?: React.ReactNode;
	fallback?: JSX.Element;
}

const AuthVerification: React.FC<IAuthVerificationProps> = ({ children, fallback }) => {
	const { activeUser } = useAuthContext();

	return activeUser ? <>{children}</> : fallback || <Link href='/signin'>You must be signed in</Link>;
};

export default AuthVerification;
