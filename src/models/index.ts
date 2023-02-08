export interface ITask {
  id: string;
  title: string;
  note?: string;
  createdAt: number;
  deadlineAt: number;
  pomodorosNumber: number;
  pomodoroTime: number;
  isCompleted: boolean;
}
