export interface Exercise {
  id: string;
  name: string;
  // in seconds
  duration: number;
  calories: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}
