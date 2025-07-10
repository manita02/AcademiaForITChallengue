import React, { useState, useEffect } from 'react';
import { Task } from '../types/task';

type TaskData = Pick<Task, 'title' | 'description' | 'completed'>;

interface TaskFormProps {
  initialTask?: TaskData;
  onSubmit: (taskData: TaskData) => void;
  loading?: boolean;
  formTitle: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSubmit, loading, formTitle }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [completed, setCompleted] = useState(initialTask?.completed || false);
  
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setCompleted(initialTask.completed);
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, completed });
  };

  return (
    <form onSubmit={handleSubmit} className="form-content">
      <div className="form-items">
        <h3 className="form-title mb-3">{formTitle}</h3>
        <p className="mb-4">
          Fill out the form to{' '}
          {formTitle.split(' ')[0].toLowerCase()} your task.
        </p>

        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={20}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={100}
            required
            rows={4}
          />
        </div>

        <div className="form-check mb-4">
          <input
            type="checkbox"
            id="completed"
            className="form-check-input"
            checked={completed}
            onChange={e => setCompleted(e.target.checked)}
          />
          <label htmlFor="completed" className="form-check-label">Completed</label>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : <><i className="bi bi-floppy-fill me-2"></i>Save</>}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;