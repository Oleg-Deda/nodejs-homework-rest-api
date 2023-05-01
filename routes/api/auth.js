const router = require("express").Router();
const { bodyValidator, authenticate, updateStatus, upload, uploadChecker, } = require("../../middlewars");
const { schemas } = require("../../models/userSchema");

const { createUser, userLogin, getCurrent, logout, updateSubscription, updateAvatar, } = require("../../controllers/auth");

router.get("/current", authenticate, getCurrent);

router.post("/register", bodyValidator(schemas.userCreateSchema), createUser);

router.post("/login", bodyValidator(schemas.userLoginSchema),  userLogin);

router.post("/logout", authenticate, logout);

router.patch("/", authenticate, updateStatus(schemas.updateSubscriptionSchema, "subscription"), updateSubscription);

router.patch("/avatars", authenticate, upload.single('avatar'), uploadChecker, updateAvatar);

module.exports = router;