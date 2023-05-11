const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
	{
		title: { type: String, required: true },
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		description: { type: String },
		summary: { type: String },
		image: { type: String },
	},
	{ timestamps: true }
);

const Post = model('Post', PostSchema);
module.exports = Post;
