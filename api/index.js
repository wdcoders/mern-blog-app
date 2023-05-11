const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const router = require('./routes/api.routes');

global.appRoot = path.resolve(__dirname);
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(__dirname + '/uploads'));

// mongo connection
mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Connected to the database!');
});

// routes
app.use('/api', router);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ message: 'Internal server error' });
});

// app settings
app.listen(PORT, () => {
	console.log(`App started http://localhost:${PORT}`);
});
