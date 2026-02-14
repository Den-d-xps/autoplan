export interface IAnimatedStatusUIProps {
  prev_message: string | null;
  current_message: string;
  animationDuration: number;
}

export interface IAnimatedStatusProps {
  message: string;
  animationDuration?: number;
}