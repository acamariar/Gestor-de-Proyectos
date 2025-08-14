import type { Request, Response } from "express";
import { Error } from "mongoose";
import Project from "../models/project";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      const error = new Error("Proyecto no encontrado");
      return res.status(404).json({ message: error.message });
    }
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);
      await task.save();
      await req.project.save();
      res.send("Tarea creada correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
