export type Task = {
  id?: number;
  name: string;
  description: string;
  done?: boolean;
  doneDate?: string | null;
  priority: number;
  startTime: string;
  endTime: string;
  date: string;
  color: string;
};
