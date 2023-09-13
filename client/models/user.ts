import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  ps_code: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
