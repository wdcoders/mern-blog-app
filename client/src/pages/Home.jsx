import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { getAllPosts } from '../services/PostApi';
import Loader from '../components/Loader';

export const Home = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		loadAllPosts();
	}, []);

	const loadAllPosts = async () => {
		const response = await getAllPosts();
		setPosts(response.data.data);
	};

	return (
		<div className="app-section app-posts-section">
			{posts.length == 0 ? (
				<Loader />
			) : (
				posts.map((p, index) => <Post key={index} data={p} />)
			)}
		</div>
	);
};
