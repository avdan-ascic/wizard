import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required!",
    unique: "Name is already in use!",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email is already registered!",
    required: "Email is required!",
    match: [/.+\@.+\../, "Please enter a valid email address!"],
  },
  password: {
    type: String,
    required: "Password is required!",
  },
});

UserSchema.pre("save", async function (next) {
  const userModel = mongoose.model("User", UserSchema);

  const sameName = await userModel.findOne({ name: this.name });
  if (sameName) next(new Error("Name is already in use!"));

  const sameEmail = await userModel.findOne({ email: this.email });
  if (sameEmail) next(new Error("Email is already registered!"));

  const pwRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
  if (!pwRegex.test(this.password))
    next(
      new Error(
        "Password can contains at least one uppercase letter, at least one special character, and must be at least 6 characters long."
      )
    );

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(new Error(err));
  }
});

export default mongoose.model("User", UserSchema);
