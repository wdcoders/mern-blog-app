import { Outlet, RouterProvider } from 'react-router-dom';
import { useContext } from 'react';
import 'react-quill/dist/quill.snow.css';
import './App.scss';
import routes from './routes/Routes';
import AuthContext from './core/context/AuthContext';

function App() {
	const [currentUser, setCurrentUser] = useContext(AuthContext);

	return (
		<RouterProvider router={routes}>
			<AuthProvider>
				<Outlet />
			</AuthProvider>
		</RouterProvider>
	);
}

export default App;
