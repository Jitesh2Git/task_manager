import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxLength: [100, "Title can be at most 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Task Description is required"],
      trim: true,
      minlength: [5, "Description must be at least 5 characters"],
      maxLength: [500, "Description can be at most 500 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
