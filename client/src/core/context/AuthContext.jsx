import { createContext, useState } from 'react';

const AuthContext = createContext({
	currentUser: null,
	isAuthenticated: () => {},
	setCurrentUser: () => {},
	clearCurrentUser: () => {},
	currentUserToken: null,
	setCurrentUserToken: () => {},
	clearCurrentUserToken: () => {},
});

export const AuthProvider = ({ children }) => {
	const [currentUser, _setCurrentUser] = useState(
		localStorage.getItem('currentUser') != null
			? JSON.parse(localStorage.getItem('currentUser'))
			: null
	);
	// const [isAuthenticated, setIsAuthenticated] = useState(false);

	const [currentUserToken, _setCurrentUserToken] = useState(
		localStorage.getItem('accessToken')
	);

	const setCurrentUser = (user) => {
		localStorage.setItem('currentUser', JSON.stringify(user));
		_setCurrentUser(user);
	};

	const clearCurrentUser = () => {
		localStorage.removeItem('currentUser');
		_setCurrentUser(null);
	};

	const setCurrentUserToken = (token) => {
		localStorage.setItem('accessToken', token);
		// setIsAuthenticated(true);
		_setCurrentUserToken(token);
	};

	const isAuthenticated = () => {
		if (currentUser != null && currentUserToken != null) {
			return true;
		}
		return false;
	};

	const clearCurrentUserToken = () => {
		localStorage.removeItem('accessToken');
		_setCurrentUserToken(null);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				currentUser,
				currentUserToken,
				setCurrentUser,
				clearCurrentUser,
				setCurrentUserToken,
				clearCurrentUserToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
