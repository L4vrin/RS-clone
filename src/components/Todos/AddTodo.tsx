import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import EditPanel from './EditPanel';
import styles from './styles/AddTodo.module.scss';

const AddTodo = ({ deadline }: { deadline: string }) => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isAddTask, setIsAddTask] = useState(false);
  const { t } = useTranslation();
  return (
    <div className={`container ${styles.container}`}>
      {isCreateMode ? (
        <EditPanel onClose={() => setIsCreateMode(false)} isAdd={isAddTask} deadline={deadline} />
      ) : (
        <motion.button
          initial={{ height: 20 }}
          animate={{ height: 40 }}
          transition={{ duration: 0.1 }}
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
        </motion.button>
      )}
    </div>
  );
};

export default AddTodo;
