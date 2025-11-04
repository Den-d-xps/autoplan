export enum Status {
  pending,
  running,
  finished,
  error
}

export type TTask = { 
  id: string; 
  script: string;
  payload: {}
  status: Status;
  error?: string
};

export interface ITaskState {
  queue: TTask[];
  isRunning: boolean;
}

