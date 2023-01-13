const router = require("express").Router();
const { policeCheck } = require("../../middlewares");
const categoryController = require("./controller");

router.get("/categories", categoryController.index);
router.post(
	"/categories",
	policeCheck("create", "Category"),
	categoryController.store,
);
router.put(
	"/categories/:id",
	policeCheck("update", "Category"),
	categoryController.update,
);
router.delete(
	"/categories/:id",
	policeCheck("delete", "Category"),
	categoryController.destroy,
);

module.exports = router;
