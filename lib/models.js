import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  points: { type: Number, default: 0 },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
