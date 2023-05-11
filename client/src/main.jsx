import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App.jsx';
import { AuthProvider } from './core/context/AuthContext.jsx';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/Routes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<AuthProvider>
		<RouterProvider router={routes} />
	</AuthProvider>
);
