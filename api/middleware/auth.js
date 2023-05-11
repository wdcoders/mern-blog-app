const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateToken = (user) => {
	const token = jwt.sign(user, secret, {
		expiresIn: '1h',
	});
	return token;
};

const authenticate = (req, res, next) => {
	// Check for JWT in authorization header
	const token = req.headers['authorization']?.replace(/^Bearer /, '');
	if (!token) {
		return res
			.status(401)
			.json({ message: 'Authorization header not found' });
	}

	// Verify JWT and attach to request object
	try {
		const decoded = jwt.verify(token, secret);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid JWT' });
	}
};

// Check user role middleware function

const authorize = (roles) => {
	return (req, res, next) => {
		// Check if user has required role
		console.log(req.user.role);
		console.log(roles);
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({ message: 'Forbidden' });
		}
		next();
	};
};

module.exports = {
	generateToken,
	authenticate,
	authorize,
};
