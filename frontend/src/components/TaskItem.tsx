import React from 'react';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      backgroundColor: task.completed ? '#e0ffe0' : '#fff'
    }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      <p><strong>Status:</strong> {task.completed ? '✅ Completed' : '❌ Pending'}</p>
      
      {onToggleComplete && (
        <button onClick={() => onToggleComplete(Number(task.id))}>
          {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
      )}
      {' '}
      {onDelete && (
        <button onClick={() => onDelete(Number(task.id))} style={{ color: 'red' }}>
          Delete
        </button>
      )}
    </div>
  );
};

export default TaskItem;

