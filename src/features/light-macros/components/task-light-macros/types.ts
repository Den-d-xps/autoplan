import type { Status } from "../../../../entities/tasks/model/types";

export type TTaskLightMacrosPropsUI = {
  cinemaName: string;
  cinemaNumber: number;
  status: Status;
  progress: number;
  message: string;
  error?: string;
}