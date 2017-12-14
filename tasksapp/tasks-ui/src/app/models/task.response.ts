export interface TaskSchema {
  success: boolean;
  msg: string;
  tasks?: {
    id: string,
    name: string,
    startDate: Date,
    endDate: Date,
    details: string,
    user: string,
    done: boolean,
    createdDate: Date
  };
}
