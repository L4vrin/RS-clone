import React, { FC, useRef, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import useActions from '../../hooks/useActions';
import useAppSelector from '../../hooks/useAppSelector';
import { ITask } from '../../models';
import NumberInput from '../ui/NumberInput';
import styles from './styles/EditPanel.module.scss';

interface EditPanelProps {
  task?: ITask;
  onClose: () => void;
}

const EditPanel: FC<EditPanelProps> = ({ task, onClose }) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const [taskTitle, setTaskTitle] = useState(task ? task.title : '');
  const [pomodorosNumber, setPomodorosNumber] = useState(task ? task.pomodorosNumber : 0);
  const [note, setNote] = useState(task ? task.note : '');
  const [deadlineDate, setDeadlineDate] = useState(
    task
      ? new Date(task.deadlineAt).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const { deleteTask, removeTaskFromTimer, addNewTask, editTask } = useActions();
  const pomodoroTime = useAppSelector((state) => state.timerSettings.workPeriodInMinutes);

  const saveHandler = () => {
    if (taskTitle) {
      const deadlineAt = new Date(deadlineDate).setHours(23, 59, 59, 999);

      if (task) {
        editTask({ id: task.id, data: { title: taskTitle, deadlineAt, pomodorosNumber, note } });
      } else {
        addNewTask({ title: taskTitle, deadlineAt, pomodorosNumber, pomodoroTime, note });
      }
      onClose();
    } else {
      titleInput.current?.focus();
    }
  };

  const changeNoteHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const minHeight = 60;
    const textarea = evt.target;
    textarea.style.height = `${Math.max(minHeight, textarea.scrollHeight)}px`;
    setNote(evt.target.value);
  };

  const changeDateHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = evt.target.value;
    setDeadlineDate(newDate);
    const timestampDate = new Date(newDate).setHours(23, 59, 59, 999);
    console.log(new Date(timestampDate));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.item}>
          <input
            className={styles.inputText}
            type="text"
            placeholder="What are you working on?"
            value={taskTitle}
            onChange={(evt) => setTaskTitle(evt.target.value)}
            ref={titleInput}
          />
        </div>
        <div className={styles.item}>
          <p className={styles.subtitle}>Pomodoros</p>
          <div className={styles.flexRow}>
            {task && (
              <>
                <div className={styles.numberWrapper}>
                  <span className={styles.numberLabel}>Complete</span>
                  <span className={styles.readOnlyNumber}>{task.completedPomodors}</span>
                </div>
                <span className={styles.numberSeparator}>/</span>
              </>
            )}
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
        <div className={styles.item}>
          <textarea
            className={`${styles.inputText} ${styles.note}`}
            placeholder="Some notes"
            value={note}
            onChange={changeNoteHandler}
          />
        </div>
        <div className={styles.item}>
          <span>Deadline: </span>
          <input type="date" value={deadlineDate} onChange={changeDateHandler} />
        </div>
      </div>
      <div className={styles.footer}>
        {task && (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => {
              deleteTask(task.id);
              removeTaskFromTimer(task.id);
            }}
          >
            Delete
          </button>
        )}
        <button type="button" className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
        <button type="button" className={styles.saveButton} onClick={saveHandler}>
          Save
        </button>
      </div>
    </div>
  );
};

EditPanel.defaultProps = {
  task: undefined,
};

export default EditPanel;
