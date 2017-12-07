export interface Task {
  name: string;
  startDate: string;
  endDate: string;
  details: string;
}

export interface TaskList {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  details: string;
  user: string;
  createdDate: string;
  done: boolean;
  doneDate?: string;
}
