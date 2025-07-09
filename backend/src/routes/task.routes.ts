import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask, getTaskById } from '../controllers/tasks.controller';

const router = Router();

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/:id', getTaskById);

export default router;

