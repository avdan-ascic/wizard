import express from "express";
import passport from "passport";

import userCtrl from "../controllers/user.controller";
import { registerValidator } from "../user.validation";
import checkValidationResult from "../user.validation";

const router = express.Router();

router
  .route("/api/users/register")
  .post(registerValidator, checkValidationResult, userCtrl.create);
router.route("/api/users/login").post(userCtrl.login);
router.route("/api/users/logout").get(userCtrl.logout);
router
  .route("/api/users/authenticate")
  .get(passport.authenticate("jwt"), userCtrl.isAuthenticated);

export default router;
