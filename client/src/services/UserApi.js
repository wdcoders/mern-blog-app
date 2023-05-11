import axiosInstance from './api';

const getMeApi = async () => {
	return axiosInstance.get('me');
};

export { getMeApi };
