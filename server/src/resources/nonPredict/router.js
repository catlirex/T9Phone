const router = require("express").Router();

const { translate } = require("./controller.js");

router.get("/:input", translate);

module.exports = router;
