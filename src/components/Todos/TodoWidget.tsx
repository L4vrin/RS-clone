import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoCompletedList from './TodoCompletedList';
import {ITodo} from './interfaces/todiInterfaces';

const TodoWidget = () => {
  const [todos, setTodos]: any = useState([]);

  const addTodoHandler = (text: string) => {
    const newTodo = {
      text,
      isCompleted: false,
      id: uuidv4(),
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodoHandler = (id: string) => {
    setTodos(todos.filter((todo: ITodo) => todo.id !== id));
  };

  const toggleTodoHandler = (id: string) => {
    setTodos(
      todos.map((todo: ITodo) => {
        return todo.id === id
          ? {...todo, isCompleted: !todo.isCompleted}
          : {...todo};
      })
    );
  };

  return (
    <>
      <TodoForm addTodo={addTodoHandler} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodoHandler}
        toggleTodo={toggleTodoHandler}
      />
      <TodoCompletedList
        todos={todos}
        deleteTodo={deleteTodoHandler}
        toggleTodo={toggleTodoHandler}
      />
    </>
  );
};

export default TodoWidget;
