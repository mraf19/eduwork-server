const router = require("express").Router();
const tagController = require("./controller");

router.get("/tags", tagController.index);
router.post("/tags", tagController.store);
router.put("/tags", tagController.update);
router.delete("/tags", tagController.destroy);

module.exports = router;
