const { Router } = require("express");
const phoneRouter = require("./phonerouters");

const router = Router();

router.get("/", (req, res, next) => {
  res.status(501).send("have not time yet");
});

router.use("/phones", phoneRouter);
module.exports = router;
