import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { HiPlusCircle } from 'react-icons/hi';
import EditPanel from './EditPanel';
import styles from './styles/AddTodo.module.scss';

const AddTodo = ({ deadline }: { deadline: string }) => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isAddTask, setIsAddTask] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  const [containerHeight, setContainerHeight] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const calcHeight = (el: HTMLElement) => {
    const height = el.offsetHeight + 2;
    setContainerHeight(height);
  };

  useEffect(() => {
    setContainerHeight(containerRef.current?.offsetHeight);
  }, []);

  return (
    <div
      className={`container ${styles.container}`}
      ref={containerRef}
      style={{ height: containerHeight }}
    >
      <CSSTransition in={isCreateMode} unmountOnExit timeout={500} onEnter={calcHeight}>
        <EditPanel
          onClose={() => setIsCreateMode(false)}
          isAdd={isAddTask}
          deadline={deadline}
          openButton={buttonRef.current}
        />
      </CSSTransition>

      <CSSTransition
        in={!isCreateMode}
        unmountOnExit
        timeout={{ appear: 0, enter: 500, exit: 0 }}
        onEnter={calcHeight}
      >
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
      </CSSTransition>
    </div>
  );
};

export default AddTodo;
