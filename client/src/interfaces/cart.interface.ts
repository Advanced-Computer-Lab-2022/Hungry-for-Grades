

export interface ICartStore {
  cart: Set<string>;
  addCourse: (courseId: string) => void;
  removeCourse: (_id: string) => void;
  setCart: (ids: string[]) => void;
  clearCart: () => void;
  inCart: (_id: string) => boolean;
  totalItems: number;
}
