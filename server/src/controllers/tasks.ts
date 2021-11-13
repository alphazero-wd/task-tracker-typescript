import { ErrorResponse } from "../utils/ErrorResponse";
import { Task } from "../models/Task";
import { ControllerFn } from "../utils/types";

export const getTasks: ControllerFn = async (req, res) => {
  try {
    const tasks = await Task.find({ where: { userId: req.payload?.userId } });
    return res.status(200).json({
      success: true,
      nbHits: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const addTask: ControllerFn = async (req, res, next) => {
  try {
    const { taskName, isImportant, isCompleted } = req.body;

    if (!taskName)
      return next(new ErrorResponse("TaskName Must Be Provided", 400));

    console.log(req.payload?.userId);

    const newTask = await Task.create({
      taskName,
      isImportant,
      isCompleted,
      userId: req.payload!.userId,
    }).save();

    return res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message));
  }
};

export const updateTask: ControllerFn = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;

    const taskId = parseInt(id);
    const task = await Task.findOne(taskId);

    if (!task)
      return next(new ErrorResponse(`No Task Found With the ID: ${id}.`, 404));

    await Task.merge(task, updatedTask).save();

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message));
  }
};

export const deleteTask: ControllerFn = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne(id);
    if (task) {
      await Task.delete(id);
      return res.status(200).json({
        success: true,
        message: `Task With the ID: ${id} has been deleted.`,
      });
    } else {
      return next(new ErrorResponse(`No Task Found With the ID: ${id}`, 404));
    }
  } catch (error) {
    return next(new ErrorResponse(error.message));
  }
};
