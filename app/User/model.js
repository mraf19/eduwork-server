const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

let userSchema = Schema(
	{
		full_name: {
			type: String,
			required: [true, "Nama tidak boleh kosong!"],
			maxlength: [255, "Panjang nama tidak boleh lebih dari 255 karakter!"],
			minlength: [3, "Panjang nama tidak boleh kurang dari 3 karakter!"],
		},
		customer_id: {
			type: Number,
		},
		email: {
			type: String,
			require: [true, "Email tidak boleh kosong!"],
			maxlength: [255, "Panjang email tidak boleh lebih dari 255 karakter!"],
		},
		password: {
			type: String,
			require: [true, "Password tidak boleh kosong!"],
			maxlength: [255, "Panjang password tidak boleh lebih dari 255 karakter!"],
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		token: [String],
	},
	{ timestamps: true },
);

userSchema.path("email").validate(
	function (value) {
		const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		return EMAIL_RE.test(value);
	},
	(attr) => `${attr.value} harus merupakan email yang valid`,
);

userSchema.path("email").validate(
	async function (value) {
		try {
			const count = await this.model("User").count({ email: value });
			return !count;
		} catch (err) {
			throw err;
		}
	},
	(attr) => `${attr.value} sudah terdaftar`,
);

const HASH_ROUND = 10;
userSchema.pre("save", function (next) {
	this.password = bcrypt.hashSync(this.password, HASH_ROUND);
	next();
});

userSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

module.exports = model("User", userSchema);
