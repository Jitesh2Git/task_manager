import Task from "../models/task.model.js";

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({ success: true, message: "Tasks fetched", data: tasks });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });
    res
      .status(201)
      .json({ success: true, message: "Task created", data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) throw new Error("Task not found");
    res
      .status(200)
      .json({ success: true, message: "Task updated", data: task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) throw new Error("Task not found");
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

export const toggleTaskStatus = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) throw new Error("Task not found");
    task.status = task.status === "pending" ? "completed" : "pending";
    await task.save();
    res
      .status(200)
      .json({ success: true, message: "Status toggled", data: task });
  } catch (error) {
    next(error);
  }
};
