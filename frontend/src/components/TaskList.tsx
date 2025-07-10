import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Task } from '../types/task';
import TaskItem from '../components/TaskItem';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSearchClick = () => {
    alert('Test Click');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`);
      if (!res.ok) throw new Error('Error getting tasks');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (res.status === 204) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'completed') return task.completed;
    if (filterStatus === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <>
      <div className="searchBarContainer text-center">
        <h2
          className="task-title-glitch mb-4"
          onClick={() =>
            (window as any).openCustomModal({
              title: 'About Task Manager',
              body: 'This app allows you to create, update and delete your tasks easily.',
              onConfirm: () => {},
              showCancel: false
            })
          }
          style={{ cursor: 'pointer' }}
        >
          TASK MANAGER
        </h2>
        <div className="d-flex justify-content-center flex-wrap gap-2">
          <div className="input-group" style={{ maxWidth: '400px', flexGrow: 1 }}>
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSearchClick}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>

          <select
            className="form-select"
            style={{ width: '150px' }}
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Pending</option>
          </select>
        </div>
      </div>

      <div className="container mt-4">
        {loading ? (
          <p>Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <div className="row">
            {filteredTasks.map(task => (
              <div key={task.id} className="col-md-4 mb-4">
                <TaskItem task={task} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TaskList;
