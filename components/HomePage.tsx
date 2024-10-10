import React, { useContext, useState, useEffect } from 'react';
import { TaskContext } from '../app/context/TaskContext';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const useDebounce = (value: any, delay: any) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const HomePage: React.FC = () => {
  const { setFilter, setSearchQuery } = useContext(TaskContext) as any;
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  const handleFilterClick = (filter: string) => {
    setFilter(filter);
    setActiveFilter(filter);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Task Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm />
          <div className="mt-4 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center">
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <Button
                onClick={() => handleFilterClick('all')}
                variant={activeFilter === 'all' ? "default" : "outline"}
                size="sm"
                className={`flex-grow sm:flex-grow-0 ${activeFilter === 'all' ? "bg-blue-500 text-white" : ""}`}
              >
                All
              </Button>
              <Button
                onClick={() => handleFilterClick('completed')}
                variant={activeFilter === 'completed' ? "default" : "outline"}
                size="sm"
                className={`flex-grow sm:flex-grow-0 ${activeFilter === 'completed' ? "bg-green-500 text-white" : ""}`}
              >
                Completed
              </Button>
              <Button
                onClick={() => handleFilterClick('incomplete')}
                variant={activeFilter === 'incomplete' ? "default" : "outline"}
                size="sm"
                className={`flex-grow sm:flex-grow-0 ${activeFilter === 'incomplete' ? "bg-yellow-500 text-white" : ""}`}
              >
                Incomplete
              </Button>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search tasks"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-4 py-2 w-full"
              />
            </div>
          </div>
          <TaskList />
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;