import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Task } from '../types/task';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`);
      if (!res.ok) throw new Error('Error getting tasks');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
      alert('Error loading tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task??')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (res.status === 204) {
        fetchTasks();
      } else {
        alert('Error deleting task');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting task');
    }
  };

  return (
    <div>
      <h1>TASK LIST</h1>
      <Link href="/tasks/new" style={{ marginBottom: 20, display: 'inline-block' }}>
        + Create new task
      </Link>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} style={{ marginBottom: 10 }}>
              <strong>{task.title}</strong> - {task.description}
              {task.completed ? ' ✅' : ''}
              <br />
              <Link href={`/tasks/${task.id}/edit`} style={{ marginRight: 10 }}>
                Update
              </Link>
              <button onClick={() => handleDelete(Number(task.id))}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
