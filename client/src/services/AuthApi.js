const loginApi = async (data) => {
	let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}login`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' },
	});
	response = response.json();
	console.log(response);
	return response;
};

const registerApi = async (data) => {
	let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}register`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' },
	});
	response = response.json();
	return response;
};

const logoutApi = async () => {
	// let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}register`, {
	// 	method: 'POST',
	// 	body: JSON.stringify(data),
	// 	headers: { 'Content-Type': 'application/json' },
	// });
	// response = response.json();
	// return response;
};

export { loginApi, registerApi, logoutApi };
