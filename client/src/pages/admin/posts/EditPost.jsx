import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { editPost, getPost } from '../../../services/PostApi';
import { Link, Navigate, useParams } from 'react-router-dom';

const EditPost = () => {
	const params = useParams();
	const [redirect, setRedirect] = useState(false);
	const [postTitle, setPostTitle] = useState('');
	const [postSummary, setPostSummary] = useState('');
	const [postDescription, setPostDescription] = useState('');
	const [postImage, setPostImage] = useState('');

	useEffect(() => {
		loadPost();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loadPost = async () => {
		const response = await getPost(params.id);
		const post = response.data.data;

		setPostTitle(post.title);
		setPostSummary(post.summary);
		setPostDescription(post.description);
	};

	const handleTitle = (e) => {
		setPostTitle(e.target.value);
	};

	const handleSummary = (e) => {
		setPostSummary(e.target.value);
	};

	const handleDescription = (value) => {
		setPostDescription(value);
	};

	const handleFile = (e) => {
		setPostImage(e.target.files[0]);
	};

	if (redirect) {
		return <Navigate to={'/'} />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', postImage);
		formData.append('title', postTitle);
		formData.append('description', postDescription);
		formData.append('summary', postSummary);
		const response = await editPost(params.id, formData);
		console.log(response);
		setRedirect(true);
	};
	return (
		<div className="row justify-content-center">
			<div className="col-12">
				<div className="card app-card">
					<div className="card-body">
						<h5 className="card-title">Edit Post</h5>

						<form
							className="be-card-form-inner"
							onSubmit={handleSubmit}
						>
							<div className="mb-3">
								<label className="form-label">
									Title <span>*</span>
								</label>
								<input
									type="text"
									name="title"
									value={postTitle}
									className="form-control"
									placeholder="Title"
									onChange={handleTitle}
								/>
								<div className="form-text invalid-feedback"></div>
							</div>
							<div className="mb-3">
								<label className="form-label">
									Summary <span>*</span>
								</label>
								<input
									type="text"
									name="summary"
									value={postSummary}
									className="form-control"
									placeholder="Summary"
									onChange={handleSummary}
								/>
								<div className="form-text invalid-feedback"></div>
							</div>
							<div className="mb-3">
								<label className="form-label">Image</label>
								<input
									type="file"
									className="form-control"
									onChange={handleFile}
								/>
								<div className="form-text invalid-feedback"></div>
							</div>
							<div className="mb-3">
								<label className="form-label">
									Description
								</label>
								<ReactQuill
									theme="snow"
									modules={modules}
									formats={formats}
									value={postDescription}
									onChange={handleDescription}
								/>
							</div>
							<button type="submit" className="btn btn-primary">
								Save Post
							</button>
							<Link
								to={'/'}
								type="button"
								className="btn btn-secondary ms-2"
							>
								Cancel
							</Link>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditPost;

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ size: [] }],
		[{ font: [] }],
		[{ align: ['right', 'center', 'justify'] }],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link', 'image'],
		[{ color: ['red', '#785412'] }],
		[{ background: ['red', '#785412'] }],
	],
};

const formats = [
	'header',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'link',
	'color',
	'image',
	'background',
	'align',
	'size',
	'font',
];
