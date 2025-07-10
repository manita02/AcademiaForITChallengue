import express from 'express';
import cors from 'cors'; // npm install --save-dev @types/cors
import tasksRouter from './routes/task.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

export default app;

