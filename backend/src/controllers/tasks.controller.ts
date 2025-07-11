import { RequestHandler, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/tasks or /api/tasks?title=searchTerm
 * 
 * Retrieves all tasks or filters them by title.
 * Results are ordered by creation date (descending).
 * 
 * @param req Express request object
 * @param res Express response object
 */
export const getTasks: RequestHandler = async (req, res) => {
  const { title } = req.query;
  const tasks = await prisma.task.findMany({
    where: title
      ? {
          title: {
            contains: String(title).toUpperCase(),
          },
        }
      : undefined,
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.json(tasks);
};

/**
 * POST /api/tasks
 * 
 * Creates a new task after validating the input.
 * 
 * @param req Express request object (expects title, description, completed)
 * @param res Express response object
 */
export const createTask: RequestHandler = async (req, res) => {
  const { title, description, completed } = req.body;
  const error = validateTaskInput(title, description);
  if (error) {
    res.status(400).json({ error });
    return;
  }
  const newTask = await prisma.task.create({
    data: {
      title: title.toUpperCase(),
      description,
      completed: completed,
      createdAt: new Date()
    }
  });
  res.status(201).json(newTask);
};
  
/**
 * PUT /api/tasks/:id
 * 
 * Updates an existing task by ID.
 * Validates input and keeps unchanged fields if not provided.
 * 
 * @param req Express request object (expects title, description, completed in body, id in params)
 * @param res Express response object
 */
export const updateTask: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description, completed } = req.body;
  const error = validateTaskInput(title, description);
  if (error) {
    res.status(400).json({ error });
    return;
  }
  const task = await findTask(id, res);
  if (!task) return;
  const updatedTask = await prisma.task.update({
    where: { id },
    data: {
      title: title.toUpperCase(),
      description: description,
      completed: completed ?? task.completed
    }
  });
  res.json(updatedTask);
};

/**
 * DELETE /api/tasks/:id
 * 
 * Deletes a task by ID after verifying it exists.
 * 
 * @param req Express request object (expects id in params)
 * @param res Express response object
 */
export const deleteTask: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = await findTask(id, res);
  if (!task) return;
  await prisma.task.delete({ where: { id } });
  res.status(204).send();
};

/**
 * Validates task title and description.
 * Checks presence, non-empty strings, and max length constraints.
 * 
 * @param title Task title
 * @param description Task description
 * @returns Error message string if invalid, or null if valid
 */
export function validateTaskInput(title: string, description: string): string | null {
  if (!title || !description) {
    return 'Title and description are required';
  }
  if (title.trim() === '' || description.trim() === '') {
    return 'Title and description cannot be empty';
  }
  if (title.length > 20) {
    return 'Title must be at most 20 characters long';
  }
  if (description.length > 100) {
    return 'Description must be at most 100 characters long';
  }
  return null;
}

/**
 * Finds a task by ID.
 * If not found, sends a 404 response.
 * 
 * @param id Task ID
 * @param res Express response object (used to send 404 if task not found)
 * @returns Task object or null
 */
export async function findTask(id: number, res: Response) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return null;
  }
  return task;
}

/**
 * GET /api/tasks/:id
 * 
 * Retrieves a task by its ID.
 * 
 * @param req Express request object (expects id in params)
 * @param res Express response object
 */
export const getTaskById: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = await findTask(id, res);
  if (!task) return;
  res.json(task);
  return;
};
