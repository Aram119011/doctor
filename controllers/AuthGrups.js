const Grup = require('../models/GrupUser');
const User = require('../models/user')

//Express-Validator

const {validationResult} = require('express-validator');


module.exports.grupsPost = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({errors: errors.array()});
	}
	try {
		let group = {
			groupName: req.body.groupName,
			ChooseCategory: req.body.ChooseCategory,
			GroupDescription: req.body.GroupDescription
		};
		req.file ? group.GroupPicture = req.file.filename : null;
		const userEventCreate = await Grup.create(group);


		await Grup.updateOne({_id: userEventCreate._id},
			{adminUser: req.body.adminUser});

		await User.updateOne({_id: req.body.adminUser}, {
			$push: {eventAdmin: userEventCreate._id}
		});

		console.log(userEventCreate, 'group', userEventCreate._id);
		res.status(201).json({
			msg: 'This post success'
		})
	} catch (e) {
		res.status(408).json({
			msg: 'error'
		})
	}
};


module.exports.grupsDelete = async (req, res) => {
	const id = req.params.id;
	try {
		await Grup.remove({_id: req.params.id}, req.body, () => {
			res.status(201).json({msg: 'deleted success fully a post with id = ' + id})
		})
	} catch (e) {
		res.status(500).json({msg: 'error', delete: e})
	}
};

module.exports.getGroupss = async (req, res) => {
	try {
		let post = await Grup.findOne({_id: req.params.id}).populate('adminUser');
		console.log(post);
		res.send('ok')
	} catch (e) {
		res.send('error')
	}
};
