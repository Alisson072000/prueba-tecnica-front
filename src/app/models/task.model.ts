export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  status: TaskStatus;
  createdAt: string;
  dueDate?: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  assignee: string;
  dueDate?: string;
}

export interface UpdateStatusPayload {
  status: TaskStatus;
}
