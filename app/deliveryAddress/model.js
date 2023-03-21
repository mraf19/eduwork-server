const { model, Schema } = require("mongoose");

const delivAddSchema = Schema(
  {
    nama: {
      type: String,
      required: [true, "Nama alamat tidak boleh kosong!"],
      maxlength: [
        255,
        "Panjang nama alamat tidak boleh lebih dari 255 karakter",
      ],
    },
    kelurahan: {
      type: String,
      required: [true, "Kelurahan  tidak boleh kosong!"],
      maxlength: [255, "Panjang kelurahan tidak boleh lebih dari 255 karakter"],
    },
    kecamatan: {
      type: String,
      required: [true, "Kecamatan  tidak boleh kosong!"],
      maxlength: [255, "Panjang kecamatan tidak boleh lebih dari 255 karakter"],
    },
    kabupaten: {
      type: String,
      required: [true, "Kabupaten  tidak boleh kosong!"],
      maxlength: [255, "Panjang kabupaten tidak boleh lebih dari 255 karakter"],
    },
    provinsi: {
      type: String,
      required: [true, "Provinsi  tidak boleh kosong!"],
      maxlength: [255, "Panjang provinsi tidak boleh lebih dari 255 karakter"],
    },
    detail: {
      type: String,
      required: [true, "Detail alamat tidak boleh kosong!"],
      maxlength: [
        255,
        "Panjang detail alamat tidak boleh lebih dari 255 karakter",
      ],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("DeliveryAddress", delivAddSchema);
