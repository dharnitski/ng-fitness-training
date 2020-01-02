export interface Exercise extends ExerciseValues {
  id: string;
}

/**
 * Exercise without id
 * helper to load data from FB
 */
export interface ExerciseValues {
  name: string;
  /** in seconds */
  duration: number;
  calories: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}
