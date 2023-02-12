export interface ITask {
  id: string;
  title: string;
  note?: string;
  createdAt: number; // timestamp
  deadlineAt: number; // timestamp
  deadlineId: string;
  isCompleted: boolean;
  pomodorosNumber: number;
  pomodoroTime: number; // time in minutes
  completedPomodors: number;
}

export interface IUser {
  fullName: string,
}