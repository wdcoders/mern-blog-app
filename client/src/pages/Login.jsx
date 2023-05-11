import { useContext, useState } from 'react';
import { loginApi } from '../services/AuthApi';
import AuthContext from '../core/context/AuthContext';

const Login = () => {
	const { setCurrentUser, setCurrentUserToken } = useContext(AuthContext);
	const [authForm, setAuthForm] = useState({
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
		const response = await loginApi(authForm);
		setCurrentUser(response.data);
		setCurrentUserToken(response.token);
	};

	return (
		<div className="row justify-content-center">
			<div className="col-4">
				<div className="card app-card">
					<div className="card-body">
						<h5 className="card-title">Login</h5>
						<form
							className="be-card-form-inner"
							onSubmit={handleSubmit}
						>
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
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
