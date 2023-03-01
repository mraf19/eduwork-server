const Tag = require("./model");
const Category = require("../category/model");
const Product = require("../product/model");

const index = async (req, res, next) => {
	try {
		let tags = await Tag.find();
		return res.json(tags);
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
		let tag = await new Tag(payload);
		await tag.save();
		return res.json(tag);
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
		let tag = await Tag.findByIdAndUpdate(req.params.id, payload, {
			new: true,
			runValidators: true,
		});
		return res.json(tag);
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
		let tag = await Tag.findByIdAndDelete({ _id: req.params.id });
		return res.json(tag);
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

const showTagByCategory = async (req, res) => {
	try {
		const { category } = req.params;
		const categoryId = await Category.findOne({
			name: { $regex: category, $options: "i" },
		});
		const products = await Product.find({ category: categoryId });
		let tagIds = [];
		products.forEach((product) => {
			product.tags.forEach((tag) => {
				if (!tagIds.includes(tag)) {
					tagIds.push(tag);
				}
			});
		});

		const tags = await Tag.find({ _id: { $in: tagIds } });
		res.json(tags);
	} catch (error) {
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
	showTagByCategory,
};
