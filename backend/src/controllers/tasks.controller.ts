import { RequestHandler, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/tasks
export const getTasks: RequestHandler = async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
};

// POST /api/tasks
export const createTask: RequestHandler = async (req, res) => {
  const { title, description } = req.body;
  const error = validateTaskInput(title, description);
  if (error) {
    res.status(400).json({ error });
    return;
  }
  const newTask = await prisma.task.create({
    data: {
      title,
      description,
      completed: false,
      createdAt: new Date()
    }
  });
  res.status(201).json(newTask);
};
  
// PUT /api/tasks/:id
export const updateTask: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }
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
      title: title ?? task.title,
      description: description ?? task.description,
      completed: completed ?? task.completed
    }
  });
  res.json(updatedTask);
};


// DELETE /api/tasks/:id
export const deleteTask: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }
  const task = await findTask(id, res);
  if (!task) return;
  await prisma.task.delete({ where: { id } });
  res.status(204).send();
};

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

export async function findTask(id: number, res: Response) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return null;
  }
  return task;
}


