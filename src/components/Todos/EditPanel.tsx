import { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import useActions from '../../hooks/useActions';
import { ITask } from '../../models';
import NumberInput from '../ui/NumberInput';
import styles from './styles/EditPanel.module.scss';

interface EditPanelProps {
  task: ITask;
  close: () => void;
}

const EditPanel = ({ task, close }: EditPanelProps) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [pomodorosNumber, setPomodorosNumber] = useState(task.pomodorosNumber);
  const { deleteTask, removeTaskFromTimer, editTask } = useActions();

  const save = () => {
    if (!taskTitle) return;
    editTask({ _id: task._id, data: { title: taskTitle, pomodorosNumber } });
    close();
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.item}>
          <input
            className={styles.inputText}
            type="text"
            placeholder="What are you working on?"
            value={taskTitle}
            onChange={(evt) => setTaskTitle(evt.target.value)}
          />
        </div>
        <div className={styles.item}>
          <p className={styles.subtitle}>Pomodoros</p>
          <div className={styles.flexRow}>
            <div className={styles.numberWrapper}>
              <span className={styles.numberLabel}>Complete</span>
              <span className={styles.readOnlyNumber}>{task.completedPomodors}</span>
            </div>
            <span className={styles.numberSeparator}>/</span>
            <div className={styles.numberWrapper}>
              <span className={styles.numberLabel}>Total</span>
              <NumberInput
                value={pomodorosNumber}
                min={0}
                onChange={(value) => setPomodorosNumber(value)}
              />
            </div>
            <div className={styles.pomodoroControls}>
              <button
                className={styles.numberBtn}
                type="button"
                onClick={() => setPomodorosNumber((prev) => (prev - 1 < 0 ? 0 : prev - 1))}
                aria-label="Less pomodoros"
              >
                <AiFillCaretDown />
              </button>
              <button
                className={styles.numberBtn}
                type="button"
                onClick={() => setPomodorosNumber((prev) => prev + 1)}
                aria-label="More pomodoros"
              >
                <AiFillCaretUp />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => {
            deleteTask(task._id);
            removeTaskFromTimer(task._id);
          }}
        >
          Delete
        </button>
        <button type="button" className={styles.cancelButton} onClick={close}>
          Cancel
        </button>
        <button type="button" className={styles.saveButton} onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditPanel;
