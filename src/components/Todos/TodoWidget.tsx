import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoCompletedList from './TodoCompletedList';
import useAppSelector from '../../hooks/useAppSelector';

const TodoWidget = () => {
  const todos = useAppSelector((state) => state.tasks.list);

  return (
    <>
      <TodoForm />
      <TodoList todos={todos} />
      <TodoCompletedList todos={todos} />
    </>
  );
};

export default TodoWidget;
