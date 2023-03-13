const express = require("express");
const eventController = require("./../controllers/eventController");
const router = express.Router();

router.route("/").get(eventController.list).post(eventController.create);

router
  .route("/:id")
  .delete(eventController.delete)
  .patch(eventController.update);
module.exports = router;
