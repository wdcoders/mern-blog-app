import { Outlet } from 'react-router-dom';
import Header from './Header';
import { getMeApi } from '../../../services/UserApi';
import { useEffect } from 'react';
import Footer from './Footer';

const MasterLayout = () => {
	useEffect(() => {
		getCurrentUser();
	}, []);

	const getCurrentUser = async () => {
		const response = await getMeApi();
		console.log(response);
	};
	return (
		<div>
			<Header />
			<main className="app-main">
				<div className="container">
					<Outlet />
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default MasterLayout;
