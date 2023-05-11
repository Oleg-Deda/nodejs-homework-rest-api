const router = require("express").Router();
const ctrl = require("../../controllers/auth");
const {
  bodyValidator,
  authenticate,
  updateStatus,
  upload,
  uploadChecker,
} = require("../../middlewars");
const { schemas } = require("../../models/userSchema");

const {
  createUser,
  userLogin,
  getCurrent,
    logout,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/auth");

router.post("/register", bodyValidator(schemas.userCreateSchema), createUser);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  updateStatus(schemas.userEmailSchema, "missing required field email"),
  ctrl.resendVerifyEmail
);
router.post("/login", bodyValidator(schemas.userLoginSchema), userLogin);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/",
  authenticate,
  updateStatus(schemas.updateSubscriptionSchema, "missing field subscription"),
  updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  uploadChecker,
  updateAvatar
);

module.exports = router;
