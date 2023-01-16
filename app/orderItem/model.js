const { model, Schema } = require("mongoose");

const orderItemSchema = Schema({
	name: {
		type: String,
		minlength: [5, "Nama harus minimal 5 karakter"],
		required: [true, "Nama harus diisi"],
	},
	price: {
		type: Number,
		required: [true, "Harga harus diisi"],
	},
	qty: {
		type: Number,
		required: [true, "Jumlah harus diisi"],
		min: [1, "Jumlah minimal adalah 1"],
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product",
	},
	order: {
		type: Schema.Types.ObjectId,
		ref: "Order",
	},
});

module.exports = model("OrderItem", orderItemSchema);
