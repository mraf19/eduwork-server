const delivAdd = require("./model");

const store = async (req, res, next) => {
	try {
		const payload = req.body;
		const user = req.user;
		const delivery = new delivAdd({ ...payload, user: user._id });
		await delivery.save();
		res.json({
			message: "address uploaded successfully",
			deliveryAddress: delivery,
		});
	} catch (err) {
		if (err && err.name === "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors,
			});
		}

		next(err);
	}
};

const view = async (req, res, next) => {
	try {
		const delivery = await delivAdd.find().populate("user");
		res.json(delivery);
	} catch (err) {
		if (err && err.name === "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors,
			});
		}

		next(err);
	}
};

const update = async (req, res, next) => {
	try {
		const payload = req.body;
		const delivery = await delivAdd.findByIdAndUpdate(
			{ _id: req.params.id },
			payload,
			{ new: true, runValidators: true },
		);
		await delivery.save();
		res.json({
			message: "Address updated successfully",
			deliveryAddress: delivery,
		});
	} catch (err) {
		if (err && err.name === "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors,
			});
		}

		next(err);
	}
};

const destroy = async (req, res, next) => {
	try {
		const delivery = await delivAdd.findByIdAndDelete({ _id: req.params.id });
		res.json({
			message: "Address deleted successfully",
			data: delivery,
		});
	} catch (err) {
		if (err && err.name === "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors,
			});
		}

		next(err);
	}
};
module.exports = {
	store,
	view,
	update,
	destroy,
};
