import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = Schema({
  fullName: {
    type: String,
    required: true,
    min: 4,
    max: 30,
  },
  email: {
    type: String,
    required: true,
    min: 12,
    max: 40,
  },
  password: {
    type: String,
    required: true,
    min: 10,
    max: 255,
  },
  age: String,
  vehicle: [],
});

const User = mongoose.model("Users", userSchema);

export default User;
