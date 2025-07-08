import express from 'express';
import tasksRouter from './routes/task.routes';

const app = express();

app.use(express.json());
app.use('/api/tasks', tasksRouter);

export default app;

