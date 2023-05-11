import { useContext, useEffect } from 'react';
import AuthContext from '../core/context/AuthContext';

const Logout = () => {
	const { clearCurrentUser, clearCurrentUserToken } = useContext(AuthContext);

	useEffect(() => {
		onLogout();
	});

	const onLogout = () => {
		clearCurrentUser();
		clearCurrentUserToken();
	};

	return <div>Logout</div>;
};

export default Logout;
