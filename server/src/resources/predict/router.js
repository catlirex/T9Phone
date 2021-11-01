const router = require("express").Router();

const { predict } = require("./controller.js");

router.get("/:input", predict);

module.exports = router;
