import { useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import EditPanel from './EditPanel';
import styles from './styles/AddTodo.module.scss';

const AddTodo = () => {
  const [isCreateMode, setIsCreateMode] = useState(false);

  return (
    <div className={`container ${styles.container}`}>
      {isCreateMode ? (
        <EditPanel onClose={() => setIsCreateMode(false)} />
      ) : (
        <button type="button" className={styles.addButton} onClick={() => setIsCreateMode(true)}>
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
