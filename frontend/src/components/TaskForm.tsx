import React, { useState, useEffect } from 'react';
import { Task } from '../types/task';

type TaskData = Pick<Task, 'title' | 'description' | 'completed'>;

interface TaskFormProps {
  initialTask?: TaskData;
  onSubmit: (taskData: TaskData) => void;
  loading?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSubmit, loading }) => {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={20}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          maxLength={100}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={e => setCompleted(e.target.checked)}
          />
          Completed
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default TaskForm;