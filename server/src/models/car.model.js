import mongoose from "mongoose";

const CarSchema = mongoose.Schema({
  make: {
    type: String,
    required: "Make is required!",
  },
  model: {
    type: String,
    required: "Model is required!",
  },
  year: {
    type: Number,
    required: "Year is required!",
    maxLength: 4,
  },
  regPlate: {
    type: String,
    required: "Registration plate is required!",
    maxLength: 10,
  },
});

export default mongoose.model("Car", CarSchema);
