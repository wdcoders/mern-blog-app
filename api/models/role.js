const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
	name: { type: String, required: true },
});

const Role = model('Role', RoleSchema);
module.exports = Role;
