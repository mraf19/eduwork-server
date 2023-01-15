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
	delivAddController.view,
);
router.put(
	"/delivery-addresses/:id",
	policeCheck("update", "DeliveryAddress"),
	delivAddController.update,
);
router.delete(
	"/delivery-addresses/:id",
	policeCheck("delete", "DeliveryAddress"),
	delivAddController.destroy,
);

module.exports = router;
