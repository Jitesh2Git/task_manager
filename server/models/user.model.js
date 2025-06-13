import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Task from "./task.model.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxLength: [50, "Name can be at most 50 characters"],
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(value);
        },
        message:
          "Password must include at least one uppercase, lowercase, number, and special character.",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getFilter());
  if (user) await Task.deleteMany({ user: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
