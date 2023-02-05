import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
// import todayTodos from '../../data/todayTodos';
import {ITodo} from './interfaces/todiInterfaces';

const TodoWidget = () => {
  const [todos, setTodos]: [Array<ITodo>, Function] = useState([]);

  const addTodoHandler = (text: string) => {
    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuidv4(),
    };
    setTodos([...todos, newTodo]);
    console.log(todos);
  };

  const deleteTodoHandler = (id:string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log(1)
  };

  return (
    <>
      <TodoForm addTodo={addTodoHandler} />
      <TodoList todos={todos} deleteTodo={deleteTodoHandler} />
    </>
  );
};

export default TodoWidget;
