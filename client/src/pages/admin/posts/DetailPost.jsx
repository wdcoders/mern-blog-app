import { useContext, useEffect, useState } from 'react';
import { getPost } from '../../../services/PostApi';
import { Link, useParams } from 'react-router-dom';
const FILE_PATH = import.meta.env.VITE_API_FILE_URL;
import moment from 'moment';
import Loader from '../../../components/Loader';
import ReactQuill from 'react-quill';
import AuthContext from '../../../core/context/AuthContext';

const DetailPost = () => {
	const { isAuthenticated } = useContext(AuthContext);
	const params = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		console.log(params);
		if (post == null) {
			loadPost(params.id);
		}
	}, [params, post]);

	const loadPost = async (id) => {
		const response = await getPost(id);
		setPost(response.data.data);
	};

	return (
		<div className="card app-post-card mb-3 ">
			{post != null ? (
				<div className="row gx-4">
					<div className="col-12">
						<div className="card-body">
							<div className="card-title">
								<div
									className="card-title-h2"
									style={{ flex: '4' }}
								>
									<h2 style={{ width: '90%' }}>
										{post.title}
									</h2>
									<div className="app-post-meta">
										<span>{post.user.name}</span>
										<small className="text-body-secondary">
											{moment(post.createdAt).format(
												'LLL'
											)}
										</small>
									</div>
								</div>

								{isAuthenticated() && (
									<div className="">
										<Link
											to={`/post/edit/${post._id}`}
											className="btn btn-primary btn-rounded"
										>
											Edit Post
										</Link>
									</div>
								)}
							</div>
							<img
								src={FILE_PATH + post.image}
								className="img-fluid rounded mb-3"
								alt=""
							/>
							<ReactQuill
								className="app-quill-content"
								value={post.description}
								readOnly={true}
								theme={'bubble'}
							/>
						</div>
					</div>
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default DetailPost;
