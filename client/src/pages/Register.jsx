import { useState } from 'react';
import { registerApi } from '../services/AuthApi';

const Register = () => {
	const [authForm, setAuthForm] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleInput = (e) => {
		setAuthForm({
			...authForm,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await registerApi(authForm);
		console.log(response);
	};

	return (
		<div className="row justify-content-center">
			<div className="col-4">
				<div className="card app-card">
					<div className="card-body">
						<h5 className="card-title">Register</h5>
						<form
							className="be-card-form-inner"
							onSubmit={handleSubmit}
						>
							<div className="mb-3">
								<label className="form-label">
									Your Name <span>*</span>
								</label>
								<input
									type="text"
									name="name"
									value={authForm.name}
									className="form-control"
									placeholder="Your Name"
									onChange={handleInput}
								/>
								<div className="form-text invalid-feedback"></div>
							</div>
							<div className="mb-3">
								<label className="form-label">
									Email Address <span>*</span>
								</label>
								<input
									type="email"
									name="email"
									value={authForm.email}
									className="form-control"
									placeholder="Email Address"
									onChange={handleInput}
								/>
								<div className="form-text invalid-feedback"></div>
							</div>
							<div className="mb-3">
								<label className="form-label">
									Password <span>*</span>
								</label>
								<input
									type="password"
									name="password"
									value={authForm.password}
									className="form-control"
									placeholder="Password"
									autoComplete="off"
									onChange={handleInput}
								/>
							</div>
							{/*
							<div className="mb-3">
								<a href="http://">Forget Password</a>
							</div> */}
							<button type="submit" className="btn btn-primary">
								Register
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
