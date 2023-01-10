const User = require("../User/model");

const register = async (req, res, next) => {
	try {
		const payload = req.body;
		console.log(payload);
		let user = await new User(payload);
		await user.save();
		res.json(user);
	} catch (err) {
		if (err && err.name === "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors,
			});
		}
	}
	next(err);
};

const localStrategy = async (req, res, done) => {
	try {
		let user = await User.findOne({ email }).select(
			"-__v -createdAt -updatedAt -cart-items -token",
		);
		if (!user) return done();
	} catch (err) {
		done(err, null);
	}
	done();
};
module.exports = {
	register,
	localStrategy,
};
