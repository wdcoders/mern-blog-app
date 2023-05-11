const bcrypt = require('bcrypt');
const { Post } = require('../models');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, 'uploads/posts/'),
	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(
			Math.random() * 1e9
		)}${path.extname(file.originalname)}`;
		cb(null, uniqueSuffix);
	},
});
const uploadSingle = multer({
	storage: storage,
	limits: { fileSize: 1000000 * 5 },
}).single('image');

const index = async (req, res, next) => {
	try {
		const posts = await Post.find()
			.populate('user', ['name', '_id'])
			.sort('-createdAt');

		res.json({
			status: true,
			data: posts,
		});
	} catch (err) {
		next(err);
	}
};

const pagination = async (req, res, next) => {
	const page = parseInt(req.params.page) || 1;
	const limit = parseInt(req.params.limit) || 10;
	const skip = (page - 1) * limit;

	try {
		const posts = await Post.find()
			.skip(skip)
			.limit(limit)
			.sort('-createdAt');

		res.json({
			status: true,
			data: posts,
		});
	} catch (err) {
		next(err);
	}
};

const showPost = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.id).populate('user', [
			'name',
			'_id',
		]);

		res.json({
			status: true,
			data: post,
		});
	} catch (err) {
		next(err);
	}
};

const createPost = async (req, res, next) => {
	uploadSingle(req, res, async (err) => {
		const { title, summary, description } = req.body;

		try {
			const filePath = req.file.path;
			const post = new Post({
				title,
				summary,
				user: req.user._id,
				description: description,
				image: filePath,
			});
			await post.save();
			res.status(201).json({
				status: true,
				data: post,
			});
		} catch (err) {
			next(err);
		}
	});
};

const updatePost = async (req, res, next) => {
	uploadSingle(req, res, async (err) => {
		const { title, summary, description } = req.body;

		try {
			let filePath = null;
			if (req.file) {
				filePath = req.file.path;
			}

			const document = await Post.findOneAndUpdate(
				{ _id: req.params.id },
				{
					title,
					summary,
					user: req.user._id,
					description: description,
					...(filePath != null && { image: filePath }),
				},
				{ new: true }
			);

			res.status(201).json({
				status: true,
				data: document,
			});
		} catch (err) {
			next(err);
		}
	});
};

module.exports = { index, pagination, showPost, createPost, updatePost };
