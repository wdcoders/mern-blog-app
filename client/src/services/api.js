import axios from 'axios';
// import useAuth from '../middleware/useAuth';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
	baseURL: apiUrl,
});

// axiosInstance.defaults.headers.common['Authorization'] =
// 	'Bearer ' + localStorage.getItem('accessToken');

// axiosInstance.interceptors.request.use(
// 	(config) => {
// 		const token = useAuth();
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => Promise.reject(error)
// );

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const { response } = error;
		if (response.status === 401) {
			localStorage.removeItem('accessToken');
		}

		throw error;
	}
);

export default axiosInstance;
