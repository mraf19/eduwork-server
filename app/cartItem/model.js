const { model, Schema } = require("mongoose");

const cartItemSchema = Schema({
  name: {
    type: String,
    required: [true, "Nama tidak boleh kosong"],
    minlength: [5, "Panjang nama tidak boleh kurang dari 5"],
  },
  qty: {
    type: Number,
    required: [true, "Jumlah barang tidak boleh kosong"],
    min: [1, "Minimal jumlah barang adalah 1"],
  },
  price: {
    type: Number,
    default: 0,
  },
  image_url: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = model("Cart Item", cartItemSchema);
