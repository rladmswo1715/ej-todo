export type TTodo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt: Date | null;
};
