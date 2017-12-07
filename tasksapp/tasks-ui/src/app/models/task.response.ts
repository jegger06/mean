export interface AddTask {
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

export interface AllTask {
  success: boolean;
  msg: string;
  todaysTask?: [any];
  latestTask?: [any];
  overdueTask?: [any];
  doneTask?: [any];
}
