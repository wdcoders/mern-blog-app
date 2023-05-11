const bcrypt = require('bcrypt');
const { User } = require('../models');

const me = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findById(req.user._id);
		if (!user) {
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
			data: currentUser,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = { me };
