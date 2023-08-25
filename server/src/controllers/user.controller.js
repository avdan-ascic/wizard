import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import config from "../config";
import User from "../models/user.model";

const create = (req, res, next) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(200).json({ message: "User created successfully!" }))
    .catch((err) => res.status(400).json({ error: err.message }));
};

const login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(async (user) => {
      if (!user)
        return res.status(400).json({ error: "Email is not registered!" });

      const passwordCheck = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCheck)
        return res
          .status(400)
          .json({ error: "Email and password do not match!" });

      req.session.user = user;

      const token = jwt.sign({ id: user._id }, config.secret);

      res.cookie("token", token, { expire: new Date() + 999, httpOnly: true });

      return res
        .status(200)
        .json({ user: { id: user._id, name: user.name, email: user.email } });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.clearCookie("token");
  res.status(200).json({ message: "You have been logged out." });
};

const isAuthenticated = (req, res, next) => {
  const user = req.user;
  res
    .status(200)
    .json({ user: { id: user._id, name: user.name, email: user.email } });
};

export default { create, login, logout, isAuthenticated };
