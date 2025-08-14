import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TakController";
import { validateProjectExist } from "../middleware/project";

const router = Router();
router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto no puede estar vacio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente no puede estar vacio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción no puede estar vacia"),
  handleInputErrors,
  ProjectController.createProject
);
router.get("/", ProjectController.getAllProjects);
router.get(
  "/:id",
  param("id").isMongoId().withMessage("El ID del proyecto no es válido"),
  handleInputErrors,
  ProjectController.getProjectById
);
router.put(
  "/:id",
  param("id").isMongoId().withMessage("El ID del proyecto no es válido"),
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto no puede estar vacio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente no puede estar vacio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción no puede estar vacia"),
  handleInputErrors,
  ProjectController.updateProject
);
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("El ID del proyecto no es válido"),
  handleInputErrors,
  ProjectController.deleteProject
);

// Rutas para las tareas

router.post(
  "/:projectId/tasks",
  validateProjectExist,
  body("name")
    .notEmpty()
    .withMessage("El nombre de la tarea no puede estar vacio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción de la tarea no puede estar vacia"),
  handleInputErrors,
  TaskController.createTask
);
router.get(
  "/:projectId/tasks",
  validateProjectExist,
  handleInputErrors,
  TaskController.getProjectTasks
);
export default router;
