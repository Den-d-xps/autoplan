export interface IPreloaderProps {
  progress: number;
  statusMessage: string;
  error: string | null;
  onReinit: () => void;
  visible: boolean;
}