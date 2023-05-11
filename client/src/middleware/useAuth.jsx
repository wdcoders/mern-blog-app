import { useState, useEffect } from 'react';

export default function useAuth() {
	const [token, setToken] = useState(null);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		if (storedToken) {
			setToken(storedToken);
		}
	}, []);

	return token;
}
