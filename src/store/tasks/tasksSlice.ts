import {v4 as uuidv4} from 'uuid';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITask} from '../../models';

const LS_TASKS_KEY = 'tasks';

interface TasksState {
  list: ITask[];
}

type NewTaskPayload = Pick<ITask, 'title' | 'pomodorosNumber' | 'pomodoroTime' | 'deadlineId'>;

type EditTaskPayload = {
  _id: string;
  data: Pick<ITask, 'title' | 'pomodorosNumber' | 'note'>;
};

const initialState: TasksState = {
  list: JSON.parse(localStorage.getItem(LS_TASKS_KEY) ?? '[]'),
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addNewTask: {
      reducer(state, action: PayloadAction<ITask>) {
        state.list.push(action.payload);
        localStorage.setItem(LS_TASKS_KEY, JSON.stringify(state.list));
      },

      prepare({
        title,
        pomodorosNumber,
        pomodoroTime,
        deadlineId,
      }: NewTaskPayload) {
        const currentDate = new Date();
        const newTask: ITask = {
          _id: uuidv4(),
          createdAt: Number(currentDate.getTime()),
          deadlineAt: Number(currentDate.setHours(23, 59, 59, 999)),
          isCompleted: false,
          completedPomodors: 0,
          deadlineId,
          title,
          pomodoroTime,
          pomodorosNumber,
          __v: 0,
        };

        return {payload: newTask};
      },
    },

    toggleComplete(state, action: PayloadAction<string>) {
      const toggledTask = state.list.find(
        (task) => task._id === action.payload
      );
      if (toggledTask) {
        toggledTask.isCompleted = !toggledTask.isCompleted;
        localStorage.setItem(LS_TASKS_KEY, JSON.stringify(state.list));
      }
    },

    setCompletedPomodoro(state, action: PayloadAction<string>) {
      const targetTask = state.list.find((task) => task._id === action.payload);
      if (targetTask) {
        targetTask.completedPomodors += 1;
        localStorage.setItem(LS_TASKS_KEY, JSON.stringify(state.list));
      }
    },

    deleteTask(state, action: PayloadAction<string>) {
      state.list = state.list.filter((task) => task._id !== action.payload);
      localStorage.setItem(LS_TASKS_KEY, JSON.stringify(state.list));
    },

    editTask(state, action: PayloadAction<EditTaskPayload>) {
      const targetTask = state.list.find((task) => task._id === action.payload._id);
      if (targetTask) {
        const { title, pomodorosNumber, note } = action.payload.data;
        targetTask.title = title;
        targetTask.pomodorosNumber = pomodorosNumber;
        targetTask.note = note;
        localStorage.setItem(LS_TASKS_KEY, JSON.stringify(state.list));
      }
    },
  },
});

export const tasksActions = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
