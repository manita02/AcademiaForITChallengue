import React from 'react';
import TaskList from '../../components/TaskList';

const TasksPage = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Task List</h1>
      <TaskList />
    </div>
  );
};

export default TasksPage;

