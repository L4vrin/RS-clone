import { useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import EditPanel from './EditPanel';
import styles from './styles/AddTodo.module.scss';

const AddTodo = ({ deadline }: { deadline: string }) => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isAddTask, setIsAddTask] = useState(false);
  return (
    <div className={`container ${styles.container}`}>
      {isCreateMode ? (
        <EditPanel onClose={() => setIsCreateMode(false)} isAdd={isAddTask} deadline={deadline} />
      ) : (
        <button
          type="button"
          className={styles.addButton}
          onClick={() => {
            setIsCreateMode(true);
            setIsAddTask(true);
          }}
        >
          <span className={styles.buttonIcon}>
            <HiPlusCircle />
          </span>
          <span className={styles.buttonText}>Add Task</span>
        </button>
      )}
    </div>
  );
};

export default AddTodo;
