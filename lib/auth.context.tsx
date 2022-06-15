import React, { createContext, useContext, useEffect, useState } from 'react';

import { auth } from '@lib/firebase.config';

import { Unsubscribe, User, onAuthStateChanged } from 'firebase/auth';

interface IAuthContext {
	activeUser: User;
	setActiveUser: React.Dispatch<React.SetStateAction<User>>;
}

interface IAuthContextProviderProps {
	children: React.ReactNode;
}

const AuthContext: React.Context<IAuthContext> = createContext<IAuthContext>(null);

const useAuthContext: () => IAuthContext = () => {
	return useContext(AuthContext);
};

const AuthContextProvider: React.FC<IAuthContextProviderProps> = ({ children }) => {
	const [activeUser, setActiveUser] = useState<User>(null);

	useEffect(() => {
		const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			setActiveUser(currentuser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return <AuthContext.Provider value={{ activeUser, setActiveUser }}>{children}</AuthContext.Provider>;
};

export { useAuthContext };
export default AuthContextProvider;
