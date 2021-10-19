const router = require("express").Router();
router.get("/", function (req, res) {
  res.send("Hey its user route");
});
module.exports = router;
