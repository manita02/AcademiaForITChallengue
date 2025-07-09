import { useState } from 'react';
import { useRouter } from 'next/router';
import TaskForm from '../../components/TaskForm';
import { Task } from '../../types/task';

type TaskData = Pick<Task, 'title' | 'description'>;

const CreateTaskPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (taskData: TaskData) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) {
        throw new Error('Error creating task');
      }
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

  return (
    <div>
      <h1>Create task</h1>
      <TaskForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
};

export default CreateTaskPage;


