const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerificationEmail)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrlWrapper(ctrl.updtSubscription)
);
router.post(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
