const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const tagSchema = new Schema({
	name: {
		type: String,
		require: [true, "Nama tag tidak boleh kosong"],
		minlength: [3, "Tag harus memilki lebih dari 3 karakter"],
		maxlength: [20, "Tag tidak boleh memliki lebih dari 20 karakter"],
	},
});

module.exports = model("Tag", tagSchema);
