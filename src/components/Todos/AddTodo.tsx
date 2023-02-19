import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import EditPanel from './EditPanel';
import styles from './styles/AddTodo.module.scss';

const AddTodo = ({ deadline }: { deadline: string }) => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isAddTask, setIsAddTask] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  return (
    <div className={`container ${styles.container}`}>
      {isCreateMode ? (
        <EditPanel
          onClose={() => setIsCreateMode(false)}
          isAdd={isAddTask}
          deadline={deadline}
          openButton={buttonRef.current}
        />
      ) : (
        <button
          ref={buttonRef}
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
          <span className={styles.buttonText}>{t('AddTask')}</span>
        </button>
      )}
    </div>
  );
};

export default AddTodo;
