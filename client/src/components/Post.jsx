import moment from 'moment';
import { Link } from 'react-router-dom';
const FILE_PATH = import.meta.env.VITE_API_FILE_URL;

const Post = ({ data }) => {
	return (
		<Link to={'/' + data._id} className="app-post-card mb-3 ">
			<div className="app-post-card-img">
				<img
					src={FILE_PATH + data.image}
					className="img-fluid rounded"
					alt=""
				/>
			</div>
			<div className="app-post-card-body">
				<div className="app-post-badge">React</div>
				<h2 className="app-post-title">{data.title}</h2>
				<p className="app-post-text">{data.summary.substr(0, 280)}</p>
				<div className="app-post-meta">
					<span>{data.user.name}</span>
					<small className="text-body-secondary">
						{moment(data.createdAt).format('LLL')}
					</small>
				</div>
			</div>
		</Link>
	);
};

export default Post;
