import { useState } from 'react';
import ReactQuill from 'react-quill';
import { createPost } from '../../../services/PostApi';
import { Navigate } from 'react-router-dom';

const CreatePost = () => {
	const [redirect, setRedirect] = useState(false);
	const [postForm, setPostForm] = useState({
		title: '',
		summary: '',
		description: '',
		image: '',
	});

	const handleInput = (e) => {
		setPostForm({
			...postForm,
			[e.target.name]: e.target.value,
		});

		console.log(postForm);
	};

	const handleDescription = (value) => {
		setPostForm({
			...postForm,
			description: value,
		});
	};

	const handleFile = (e) => {
		setPostForm({
			...postForm,
			image: e.target.files[0],
		});
		console.log(postForm);
	};

	if (redirect) {
		return <Navigate to={'/'} />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', postForm.image);
		formData.append('title', postForm.title);
		formData.append('description', postForm.description);
		formData.append('summary', postForm.summary);
		const response = await createPost(formData);
		console.log(response);
		setRedirect(true);
	};
	return (
		<div className="row justify-content-center">
			<div className="col-12">
				<div className="card app-card">
					<div className="card-body">
						<h5 className="card-title">Create Post</h5>

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
									value={postForm.title}
									className="form-control"
									placeholder="Title"
									onChange={handleInput}
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
									value={postForm.summary}
									className="form-control"
									placeholder="Summary"
									onChange={handleInput}
								/>
								<div className="form-text invalid-feedback"></div>
							</div>
							<div className="mb-3">
								<label className="form-label">
									Image <span>*</span>
								</label>
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
									value={postForm.description}
									onChange={handleDescription}
								/>
							</div>
							<button type="submit" className="btn btn-primary">
								Save Post
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;
