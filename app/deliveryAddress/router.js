const { policeCheck } = require("../../middlewares");
const router = require("express").Router();
const delivAddController = require("./controller");

router.post(
	"/delivery-addresses",
	policeCheck("create", "DeliveryAddress"),
	delivAddController.store,
);
router.get(
	"/delivery-addresses",
	policeCheck("view", "DeliveryAddress"),
	delivAddController.index,
);
router.put("/delivery-addresses/:id", delivAddController.update);
router.delete("/delivery-addresses/:id", delivAddController.destroy);

module.exports = router;
