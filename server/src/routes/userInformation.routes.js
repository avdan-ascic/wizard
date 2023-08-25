import express from "express";
import passport from "passport";

import userInfoCtrl from "../controllers/userInformation.controller";

const router = express.Router();

router
  .route("/api/userInfo/create")
  .post(passport.authenticate("jwt"), userInfoCtrl.create);
router
  .route("/api/userInfo/read")
  .get(passport.authenticate("jwt"), userInfoCtrl.read);
router
  .route("/api/userInfo/update")
  .put(passport.authenticate("jwt"), userInfoCtrl.update);
router
  .route("/api/userInfo/remove")
  .post(passport.authenticate("jwt"), userInfoCtrl.remove);

export default router;
