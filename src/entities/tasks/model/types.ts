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
  progress: number;
  message: string;
  error?: string
};

export interface ITaskState {
  queue: TTask[];
  isRunning: boolean;
}

