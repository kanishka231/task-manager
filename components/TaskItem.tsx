import React, { useContext } from 'react';
import { TaskContext } from '../app/context/TaskContext';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskProps {
  task: {
    id: string;
    text: string;
    completed: boolean;
  };
  currentFilter: 'all' | 'completed' | 'incomplete';
}

const TaskItem: React.FC<TaskProps> = ({ task, currentFilter }) => {
  const { toggleTaskCompletion, deleteTask } = useContext(TaskContext) as any;

  const getCheckboxStyles = () => {
    const baseStyles = 'w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 cursor-pointer';
    switch (currentFilter) {
      case 'all':
        return `${baseStyles} border-blue-500 ${task.completed ? 'bg-blue-500' : ''}`;
      case 'completed':
        return `${baseStyles} border-green-500 ${task.completed ? 'bg-green-500' : ''}`;
      case 'incomplete':
        return `${baseStyles} border-yellow-500 ${task.completed ? 'bg-yellow-500' : ''}`;
      default:
        return `${baseStyles} border-gray-400 ${task.completed ? 'bg-gray-400' : ''}`;
    }
  };

  return (
    <li className="flex items-center justify-between p-3 rounded-md bg-gray-100">
      <div className="flex items-center flex-grow">
        <div
          className={getCheckboxStyles()}
          onClick={() => toggleTaskCompletion(task.id)}
        >
          {task.completed && (
            <svg className="w-4 h-4 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span
          className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
          onClick={() => toggleTaskCompletion(task.id)}
        >
          {task.text}
        </span>
      </div>
      <Button onClick={() => deleteTask(task.id)} size="icon" variant="destructive">
        <X size={16} />
      </Button>
    </li>
  );
};

export default TaskItem;