import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TaskForm from '../../../components/TaskForm';
import { Task } from '../../../types/task';

type TaskData = Omit<Task, 'createdAt'>;

const EditTaskPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchTask = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`);
        if (!res.ok) throw new Error('Error getting task');
        const data = await res.json();
        setTask(data);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('An error occurred');
        }
      } finally {
        setFetching(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async (taskData: TaskData) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) throw new Error('Error updating task');

      router.push('/tasks');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p>Loading task...</p>;
  if (!task) return <p>No task found.</p>;

  return (
    <div className="formContainer">
      <TaskForm initialTask={task} onSubmit={handleUpdate} loading={loading} formTitle="Update Task"/>
    </div>
  );
};

export default EditTaskPage;
