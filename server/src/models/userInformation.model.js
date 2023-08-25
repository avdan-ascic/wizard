import mongoose from "mongoose";

const UserInformationSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First name is required!",
    match: [/^[A-Za-z ]+$/, "Only letters allowed"],
  },
  lastName: {
    type: String,
    trim: true,
    required: "Last name is required!",
    match: [/^[A-Za-z ]+$/, "Only letters allowed"],
  },
  country: {
    type: String,
    required: "Please select country!",
  },
  phoneNumber: {
    type: String,
    required: "Phone number is required!",
    match: [/^[0-9]+$/, "Only numbers allowed!"],
  },
  gender: {
    type: String,
    required: "Gender is required!",
    enum: ["Male", "Female"],
  },
  dateOfBirth: {
    type: Date,
    required: "Date of Birth is required!",
  },
  addInfo: {
    type: String,
  },
  ack: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  },
});

export default mongoose.model("User Information", UserInformationSchema);
