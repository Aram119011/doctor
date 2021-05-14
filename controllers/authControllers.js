const User = require('../models/user');
const jwt = require('jsonwebtoken');


const Experience = require('../models/Experience');
const Education = require('../models/Education');
const UserDay = require('../models/UserDay');

const config = require('../config/keys');
const Stripe = require('stripe').Stripe;
const stripe = new Stripe(config.Secret_key);
//Express-Validator

const {validationResult} = require('express-validator');

module.exports.register = async (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({errors: errors.array()});
	}

	let candidate = await User.findOne({email: req.body.email});
	if (!candidate) {
		const userData = {
			fullName,
			email,
			password,
			newCode
		} = req.body;
		req.file ? userData.myPhoto = req.file.filename : null;
		let customer = await stripe.customers.create({email: email});
		const user = await new User({
			email
		});
		try {
			userData.password = await user.encryptPassword(userData.password);
			userData.doctor = false;
			userData.customer_id = customer.id;
			await new User(userData).save();
			res.status(201).json({
				success: true,
				doctor: userData.doctor,
				fullName,
				email
			})
		} catch (e) {
			console.log(e, 'kkkkk');
			res.status(404).json({
				msg: 'Error: User not saved please try again later'
			})
		}

	} else {
		res.status(422).json({
			msg: 'The email is already used. Please, use another email'
		})
	}

};


module.exports.login = async (req, res) => {
	console.log('login');
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({errors: errors.array()});
	}
	const {
		email,
		password
	} = req.body;
	const user = await User.findOne({email: email});
	if (!user) {
		return res.status(404).send("The email doest exists")
	}
	const validatePassword = await user.validatePassword(password);
	if (!validatePassword) {
		return res.status(401).json({
			auth: false, token: null
		});
	}
	try {
		const token = jwt.sign({
				id: user._id.toString(),
				email: user.email.toString(),
				doctor: user.doctor
			},
			config.jwt_key, {
				expiresIn: 60 * 60 * 24
			});
		const refreshToken = jwt.sign({
			id: user._id.toString(),
			email: user.email.toString(),
			doctor: user.doctor
		}, config.jwt_key, {
			// expiresIn: 60 * 60 * 24
			expiresIn: '720h'
		});

		user.token = token;
		let images = user.certificateUpload;
		let link = images.map(images => {
			return user.certificateUpload ? `${req.protocol}://${req.get("host")}/uploads/certificate/${images}` : "";
		});
		link.forEach(function (value) {
			console.log(value)
		});


		let experienceFull = await Experience.find(req.userId);
		let educationFull = await Education.find(req.userId);
		let userDay = await UserDay.find(req.userId);
		res.status(201).json({
			success: true,
			user: {
				_id: user.id,
				fullName: user.fullName,
				phoneNumber: user.phoneNumber,
				professionalLicenseNumber: user.professionalLicenseNumber,
				email: user.email,
				myPhoto: user.myPhoto ? `${req.protocol}://${req.get("host")}/uploads/users/${user.myPhoto}` : "",
				about: user.about,
				doctor: user.doctor,
				name: user.name,
				last4: user.last4,
				exp_month: user.exp_month,
				exp_year: user.exp_year,
				customer_id: user.customer_id,
				cardId: user.cardId,
				experienceFull,
				educationFull,
				userDay,

				// http://localhost:8080/uploads/certificate/1608188407503120277349_3333940546686324_8249348975182923019_o.jpg
				certificateUpload: [
					`${link}`
				],
			},

			token: token,
			refreshToken,
		})
	} catch (e) {
		res.status(500).json({e: e.message});
		console.log('error')
	}
};


module.exports.myProfile = async (req, res) => {
	const user = await User.findById(req.userId);
	let experienceFull = await Experience.find({UserId: req.userId});
	let educationFull = await Education.find({UserId: req.userId});

	let userDay = await UserDay.find({UserId: req.userId});

	let images = user.certificateUpload;
	let link = images.map(images => {
		return user.certificateUpload ? `${req.protocol}://${req.get("host")}/uploads/certificate/${images}` : "";
	});

	if (!user) {
		return res.status(404).send('No user found');
	}
	// http://localhost:8080/uploads/default.png
	res.status(201).json({
		success: true,
		user: {
			_id: user.id,
			fullName: user.fullName,
			email: user.email,
			phoneNumber: user.phoneNumber,
			about: user.about,
			myPhoto: user.myPhoto ? `${req.protocol}://${req.get("host")}/uploads/users/${user.myPhoto}` : "",
			professionalLicenseNumber: user.professionalLicenseNumber,
			doctor: user.doctor,
			name: user.name,
			last4: user.last4,
			exp_month: user.exp_month,
			exp_year: user.exp_year,
			customer_id: user.customer_id,
			cardId: user.cardId,
			experienceFull,
			educationFull,
			userDay,
			certificateUpload: [
				`${link}`
			],
		},

	})
};
