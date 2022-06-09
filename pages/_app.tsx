import type { AppProps } from 'next/app';

import '../styles/globals.css';
import AuthContextProvider from '@lib/auth.context';

const App: (props: AppProps) => JSX.Element = ({ Component, pageProps }) => {
	return (
		<>
			<AuthContextProvider>
				<Component {...pageProps} />
			</AuthContextProvider>
		</>
	);
};

export default App;
