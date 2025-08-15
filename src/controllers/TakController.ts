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
      await Promise.allSettled([task.save(), req.project.save()]);
      res.send("Tarea creada correctamente");
    } catch (error) {
      console.log(error);
    }
  };
  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        "project"
      );
      res.json(tasks);
    } catch (error) {
      console.log(error);
    }
  };
  static getTaskById = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);
      if (!task) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ message: error.message });
      }
      if (task.project.toString() != req.project.id) {
        const error = new Error("Accion no valida");
        return res.status(400).json({ message: error.message });
      }
      res.json(task);
    } catch (error) {
      console.log(error);
    }
  };
  static updateTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findByIdAndUpdate(taskId, req.body);
      if (!task) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ message: error.message });
      }
      if (task.project.toString() != req.project.id) {
        const error = new Error("Accion no valida");
        return res.status(400).json({ message: error.message });
      }
      res.send("Tarea actualizada correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
