import React, { useState, useContext, useCallback } from 'react';
import { TaskContext } from '../app/context/TaskContext';
import { PlusCircle, Undo2, Redo2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const TaskForm: React.FC = () => {
  const [taskText, setTaskText] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [future, setFuture] = useState<string[]>([]);
  const { addTask } = useContext(TaskContext)!;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setTaskText(newText);
    setHistory(prev => [...prev, taskText]);
    setFuture([]);
  }, [taskText]);

  const undo = useCallback(() => {
    if (history.length > 0) {
      const prevState = history[history.length - 1];
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setFuture(prev => [taskText, ...prev]);
      setTaskText(prevState);
    }
  }, [history, taskText]);

  const redo = useCallback(() => {
    if (future.length > 0) {
      const nextState = future[0];
      const newFuture = future.slice(1);
      setFuture(newFuture);
      setHistory(prev => [...prev, taskText]);
      setTaskText(nextState);
    }
  }, [future, taskText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) {
      alert("Task cannot be empty.");
      return;
    }
    addTask(taskText);
    setTaskText('');
    setHistory([]);
    setFuture([]);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <div className="flex-grow relative">
        <Input
          type="text"
          value={taskText}
          onChange={handleChange}
          placeholder="Enter task"
          className="pr-20"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
          <Button 
            type="button" 
            size="icon" 
            variant="ghost" 
            onClick={undo} 
            disabled={history.length === 0}
          >
            <Undo2 size={16} />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="ghost" 
            onClick={redo} 
            disabled={future.length === 0}
          >
            <Redo2 size={16} />
          </Button>
        </div>
      </div>
      <Button type="submit" size="icon">
        <PlusCircle size={20} />
      </Button>
    </form>
  );
};

export default TaskForm;