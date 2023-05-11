const bcrypt = require('bcrypt');
const { User } = require('../models');
const { generateToken } = require('../middleware/auth');
const roles = ['Admin', 'Author'];

const login = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			return res
				.status(404)
				.json({ status: false, message: 'User not found' });
		}

		const isPasswordMatched = await bcrypt.compare(password, user.password);

		if (!isPasswordMatched) {
			return res
				.status(404)
				.json({ status: false, message: 'User not found' });
		}

		const currentUser = {
			_id: user._id,
			email: user.email,
			name: user.name,
			role: user.role,
		};

		res.json({
			status: true,
			token: generateToken(currentUser),
			data: currentUser,
		});
	} catch (err) {
		next(err);
	}
};

const register = async (req, res, next) => {
	const { name, email, password, role } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const user = new User({
			name: name,
			email: email,
			role: roles[0],
			password: hashedPassword,
		});
		await user.save();
		res.status(201).json({
			status: true,
			data: {
				_id: user._id,
				email: user.email,
				name: user.name,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports = { login, register, roles };
