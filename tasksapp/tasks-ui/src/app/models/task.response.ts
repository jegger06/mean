export interface TaskSchema {
  success: boolean;
  msg: string;
  data?: {
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
