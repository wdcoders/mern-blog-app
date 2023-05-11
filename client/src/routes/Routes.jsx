import { Navigate, createBrowserRouter } from 'react-router-dom';
import MasterLayout from '../components/layouts/base/MasterLayout';
import Dashboard from '../pages/admin/Dashboard';
import { Home } from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoutes from './PrivateRoutes';
import GuestRoutes from './GuestRoutes';
import Logout from '../pages/Logout';
import CreatePost from '../pages/admin/posts/CreatePost';
import DetailPost from '../pages/admin/posts/DetailPost';
import EditPost from '../pages/admin/posts/EditPost';

const routes = createBrowserRouter([
	{
		path: '',
		element: <MasterLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/login',
				element: (
					<GuestRoutes>
						<Login />
					</GuestRoutes>
				),
			},
			{
				path: '/register',
				element: (
					<GuestRoutes>
						<Register />
					</GuestRoutes>
				),
			},
			{
				path: '/dashboard',
				element: (
					<PrivateRoutes>
						<Dashboard />
					</PrivateRoutes>
				),
			},
			{
				path: '/:id',
				element: <DetailPost />,
			},
			{
				path: '/post/edit/:id',
				exact: true,
				element: (
					<PrivateRoutes>
						<EditPost />
					</PrivateRoutes>
				),
			},
			{
				path: '/post/create',
				exact: true,
				element: (
					<PrivateRoutes>
						<CreatePost />
					</PrivateRoutes>
				),
			},
			{
				path: '/logout',
				element: (
					<PrivateRoutes>
						<Logout />
					</PrivateRoutes>
				),
			},
		],
	},
]);

export default routes;
