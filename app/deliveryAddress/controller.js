const { subject } = require("@casl/ability");
const { policyfor } = require("../../utils");
const delivAdd = require("./model");

const store = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = req.user;
    const delivery = await new delivAdd({ ...payload, user: user._id });
    console.log(delivery);
    await delivery.save();
    res.json({
      message: "address uploaded successfully",
      deliveryAddress: delivery,
    });
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

const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let count = await delivAdd.find({ user: req.user._id }).countDocuments();
    const address = await delivAdd
      .find({ user: req.user._id })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort("-createdAt");
    res.json(address);
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
    let { _id, ...payload } = req.body;
    let { id } = req.params;
    let address = await delivAdd.findById(id);
    let subjectAddress = subject("DeliveryAdress", {
      ...address,
      user_id: address.user,
    });
    let policy = policyfor(req.user);
    if (!policy.can("update", subjectAddress)) {
      return res.json({
        error: 1,
        message: "You are not allowed to modify this resource",
      });
    }
    address = await delivAdd.findByIdAndUpdate(id, payload, { new: true });
    res.json({
      message: "Address updated successfully",
      deliveryAddress: address,
    });
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
    let { id } = req.params;
    let address = await delivAdd.findById(id);
    let subjectAddress = subject("DeliveryAddress", {
      ...address,
      user_id: address.user,
    });
    let policy = policyfor(req.user);
    if (!policy.can("delete", subjectAddress)) {
      return res.json({
        error: 1,
        message: "You are not allowed to delete this resource",
      });
    }
    address = await delivAdd.findByIdAndDelete(id);
    res.json({
      message: "Address deleted successfully",
      data: address,
    });
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
  store,
  index,
  update,
  destroy,
};
