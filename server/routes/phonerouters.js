const { Router } = require("express");
const {
  phoneController: {
    getPhone,
    createPhone,
    getPhoneById,
    updadePhoneById,
    deletePhoneById,
  },
} = require("../controllers");
const phoneRouter = Router();

phoneRouter.route("/").get(getPhone).post(createPhone);

phoneRouter
  .route("/:idPhone")
  .get(getPhoneById)
  .patch(updadePhoneById)
  .delete(deletePhoneById);

module.exports = phoneRouter;
