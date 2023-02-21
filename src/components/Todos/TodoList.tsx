import { Reorder } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Todo from './Todo';
import styles from './styles/TodoList.module.scss';
import { ITask } from '../../models';
import { todoVariants } from './styles/variants';
import { useUpdateTodoMutation } from '../../store/tasks/tasksApi';

interface TodoListProps {
  todos: ITask[];
  isLoading: boolean;
  deadline: string;
}

const TodoList = ({ todos, isLoading, deadline }: TodoListProps) => {
  const { t } = useTranslation();
  const [currentTodo, setCurrentTodo] = useState<ITask>();
  const [updateTodo, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate }] =
    useUpdateTodoMutation();
  const [inCompletedTodos, setInCompletedTodos] = useState<ITask[]>(todos);
  const [prevStatus, setPrevStatus] = useState<ITask[]>(todos);
  const [newArray, setNewArray] = useState<ITask[]>(todos);

  useEffect(() => {
    setInCompletedTodos(todos);
  }, [todos]);

  const dragStartHandler = (todo: any) => {
    setPrevStatus(inCompletedTodos);

  };

  const dragEndHandler = (e: any, todo: any) => {
    console.log('prev', prevStatus);
    console.log('now', inCompletedTodos);
    console.log('array', newArray);
    
    if (inCompletedTodos && prevStatus) {
      setNewArray ([
        ...inCompletedTodos.map((todoq: any, index: number) => {
          
          if (prevStatus[index].order !== todoq.order) {
            console.log(1)

            return { ...todoq, order: prevStatus[index].order};
          }

          return { ...todoq };
        }),
      ]);

      
      setPrevStatus(newArray)
      console.log('newPrev', prevStatus)
    }
  };


  // const dragEndHandler = (e: any, todo: any) => {
  //   console.log('prev', prevStatus);
  //   console.log('now', inCompletedTodos);

  //   if (inCompletedTodos && prevStatus) {
  //     const arrayForServer: any = [
  //       ...inCompletedTodos.map((todoq: any, index: number) => {
          
  //         if (prevStatus[index].order !== todoq.order) {
  //           console.log(1)

  //           return { ...todoq, order: prevStatus[index].order};
  //         }

  //         return { ...todoq };
  //       }),
  //     ];

  //     console.log('array', arrayForServer);
  //     setPrevStatus(arrayForServer)
  //     console.log('newPrev', prevStatus)
  //   }
  // };

  return (
    <Reorder.Group
      axis="y"
      className={inCompletedTodos ? styles.todoList : styles.hidden}
      onReorder={setInCompletedTodos}
      values={inCompletedTodos}
    >
      {!!todos && <h2>{t('TaskList')}</h2>}
      {isLoading && <div className={styles.loader} />}
      {inCompletedTodos?.map((todo: ITask, i: number) => (
        <Reorder.Item
          key={todo._id}
          className={styles.todoWrapper}
          value={todo}
          whileDrag={{
            scale: 1.05,
            boxShadow: '0px 10px 10px -7px #000000',
          }}
          variants={todoVariants}
          initial="hidden"
          animate="visible"
          custom={i}
          onDragStart={(e) => dragStartHandler(todo)}
          onDragEnd={(e) => dragEndHandler(e, todo)}
        >
          <Todo todo={todo} deadline={deadline} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default TodoList;
