import React, { useContext } from 'react';
import { TaskContext } from '../app/context/TaskContext';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const { tasks, filter, searchQuery } = useContext(TaskContext) as any;

  const filteredTasks = tasks.filter((task: any) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'incomplete' && !task.completed);
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });



  return (
    <ul className="mt-4 space-y-2">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task: any) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            currentFilter={filter}
          />
        ))
      ) : (
        <li className="text-center text-gray-500">No tasks found</li>
      )}
    </ul>
  );
};

export default TaskList;