import axiosInstance from './api';

const getPost = async (id) => {
	return axiosInstance.get('/post/' + id);
};

const getAllPosts = async () => {
	return axiosInstance.get('/post');
};

const createPost = async (data) => {
	return axiosInstance.post('/post', data);
};

const editPost = async (id, data) => {
	return axiosInstance.put('/post/' + id, data);
};

export { getPost, getAllPosts, createPost, editPost };
