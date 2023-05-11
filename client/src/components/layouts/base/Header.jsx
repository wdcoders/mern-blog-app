import { Link } from 'react-router-dom';
import AuthContext from '../../../core/context/AuthContext';
import { useContext } from 'react';

const Header = () => {
	const { currentUser, currentUserToken } = useContext(AuthContext);

	return (
		<header className="app-header">
			<div className="container">
				<Link to="/" className="app-logo">
					<h4>Mern Blog</h4>
				</Link>

				{currentUser != null && currentUserToken != null ? (
					<div className="app-header-nav">
						<strong>({currentUser.name})</strong>
						<Link to="/logout" className="app-header-nav-link">
							Logout
						</Link>
					</div>
				) : (
					<div className="app-header-nav">
						<Link to="/login" className="app-header-nav-link">
							Login
						</Link>
						<Link to="/register" className="app-header-nav-link">
							Register
						</Link>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
