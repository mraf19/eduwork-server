const Category = require("./model");

const index = async (req, res, next) => {
	try {
		let categories = await Category.find();
		return res.json(categories);
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

const store = async (req, res, next) => {
	try {
		let payload = req.body;
		let category = await new Category(payload);
		await category.save();
		return res.json(category);
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
		let payload = req.body;
		let category = await Category.findByIdAndUpdate(req.params.id, payload, {
			new: true,
			runValidators: true,
		});
		return res.json(category);
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

const destroy = async (res, req, next) => {
	try {
		let category = await Category.findByIdAndDelete({ _id: req.params.id });
		return res.json(category);
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
	index,
	store,
	update,
	destroy,
};
