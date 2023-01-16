const router = require("express").Router();
const { policeCheck } = require("../../middlewares");
const OrderController = require("./controller");

router.get("/orders", policeCheck("view", "Order"), OrderController.index);
router.post("/orders", policeCheck("create", "Order"), OrderController.store);

module.exports = router;
