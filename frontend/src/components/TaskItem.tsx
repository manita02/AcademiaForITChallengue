import React from 'react';
import Link from 'next/link';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onDelete?: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <div className="card text-center mb-4 shadow-sm">
      <div className="card-header text-muted"> <i className="bi bi-calendar-event me-2"></i>
        {new Date(task.createdAt).toLocaleString()}
      </div>
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>

        <span
          className={`badge d-inline-flex align-items-center gap-1 ${task.completed ? 'bg-success' : 'bg-warning text-dark'}`}
        >
          <i className={`bi ${task.completed ? 'bi-check-circle-fill' : 'bi-hourglass-split'}`}></i>
          {task.completed ? 'Completed' : 'Pending'}
        </span>

      </div>

      <div className="card-footer d-flex justify-content-center gap-2">
        <Link
          href={`/tasks/${task.id}/edit`}
          className="btn btn-outline-primary btn-sm"
        >
          <i className="bi bi-pencil"></i>
        </Link>
        
        {onDelete && (
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() =>
              (window as any).openCustomModal({
                title: 'Confirm Deletion',
                body: 'Are you sure you want to delete this task?',
                onConfirm: () => onDelete(Number(task.id)),
              })
            }
          >
            <i className="bi bi-trash"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;

