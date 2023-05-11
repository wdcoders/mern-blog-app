import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../core/context/AuthContext';

const PrivateRoutes = ({ children }) => {
	const { currentUser, currentUserToken } = useContext(AuthContext);

	if (currentUser == null || currentUserToken == null) {
		return <Navigate to={'/login'} />;
	}
	return children;
};

export default PrivateRoutes;
