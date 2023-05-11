const express = require('express');
const router = express.Router();
const { Role } = require('../models');
const {
	AuthController,
	UserController,
	PostController,
} = require('../controllers');
const { authenticate, authorize } = require('../middleware/auth');

// Auth
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

// User
router.get('/me', authenticate, authorize(['Admin']), UserController.me);

router.get('/post', PostController.index);
router.get('/post/pagination/:page/:limit', PostController.pagination);
router.get('/post/:id', PostController.showPost);
router.post(
	'/post',
	authenticate,
	authorize(['Admin']),
	PostController.createPost
);
router.put(
	'/post/:id',
	authenticate,
	authorize(['Admin']),
	PostController.updatePost
);
// Roles
// router.get('/roles', async (req, res) => {
// 	const roles = [
// 		{
// 			name: 'Admin',
// 		},
// 		{
// 			name: 'Author',
// 		},
// 	];

// 	roles.forEach(async (e) => {
// 		let checkExistsOrNot = await Role.findOne({ name: e.name });
// 		if (!checkExistsOrNot) {
// 			Role.create({ name: e.name })
// 				.then(function (docs) {
// 					return res.json(docs);
// 				})
// 				.catch(function (err) {
// 					return res.status(500).send(err);
// 				});
// 		}
// 	});

// 	return res.status(200).json({ status: true });
// });

module.exports = router;
