const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let User = require('../models/user.model');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'images'); // saves to backend/images
		// cb(null, '..frontend/public/images'); // saves to frontend/public/images
	},
	filename: function (req, file, cb) {
		cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
	},
});

const fileFilter = (req, file, cb) => {
	const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
	if (allowedFileTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

let upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

router.get('/birds', function (req, res) {
	res.send('Birds home page');
});

router.get('/', async (req, res) => {
	try {
		const users = await User.find(); // use .select option to prevent that field coming back in res
		res.json(users);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

router.route('/add').post(upload.single('photo'), (req, res) => {
	const name = req.body.name;
	const birthdate = req.body.birthdate;
	const photo = req.file.filename;

	const newUserData = {
		name,
		birthdate,
		photo,
	};

	const newUser = new User(newUserData);

	newUser
		.save()
		.then(() => res.json('User Added'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
