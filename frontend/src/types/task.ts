export type Task = {
  /**
   * The `id` is optional because:
   * - For new tasks, it doesn't exist yet (not generated).
   * - For existing tasks (edit, list), it is already present.
  */
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
};
