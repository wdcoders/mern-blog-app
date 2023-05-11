import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../core/context/AuthContext';

const GuestRoutes = ({ children }) => {
	const { currentUser, currentUserToken } = useContext(AuthContext);

	if (currentUser == null || currentUserToken == null) {
		return children;
	}
	return <Navigate to={'/dashboard'} />;
};

export default GuestRoutes;
