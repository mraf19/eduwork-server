const Invoice = require("./model");

const show = async (req, res) => {
  try {
    let { order_id } = req.params;
    let invoice = await Invoice.findOne({ order: order_id })
      .populate("order")
      .populate("user");
    return res.json(invoice);
  } catch (err) {
    res.json({
      error: 1,
      message: "Error when getting invoice",
    });
  }
};

module.exports = {
  show,
};
