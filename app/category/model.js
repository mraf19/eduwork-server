const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const categorySchema = new Schema({
	name: {
		type: String,
		require: [true, "Nama tidak boleh kosong"],
		minlength: [3, "Nama harus memiliki minimal 3 karakter"],
		maxlength: [20, "Nama tidak boleh memiliki lebih dari 20 kaarakter"],
	},
});

module.exports = model("Catetegory", categorySchema);
