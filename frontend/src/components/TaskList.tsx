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
    if (!searchTerm.trim()) {
      (window as any).openCustomModal({
        title: 'Search Required',
        body: 'Please enter a title or keyword to search.',
        onConfirm: () => {},
        showCancel: false
      });
      return;
    }

    fetchTasksByTitle(searchTerm);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterStatus(value);

    if (value === 'all') {
      fetchTasks();
    }
  };

  const fetchTasksByTitle = async (title: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/search?title=${encodeURIComponent(title)}`);
      if (!res.ok) throw new Error('Error searching tasks');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Error searching tasks:', error);
    } finally {
      setLoading(false);
    }
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
        >
          TASK MANAGER
        </h2>
        <div className="d-flex justify-content-center flex-wrap gap-2">
          <div className="input-group" style={{ maxWidth: '400px', flexGrow: 1 }}>
            <input
              type="search"
              className="form-control"
              placeholder="Search by title"
              aria-label="Search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearchClick();
                }
              }}
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
          <p className="alert alert-warning text-center fw-semibold d-flex justify-content-center align-items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill"></i>
            No tasks found.
          </p>
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
