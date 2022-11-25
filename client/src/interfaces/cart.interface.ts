export interface ICart {
  _id: string;
  price: number;
}

export interface ICartStore {
  cart: Set<ICart>;
  addCourse: (course: ICart) => void;
  removeCourse: (_id: string) => void;
  setCart: (cart: ICart[]) => void;
  clearCart: () => void;
  inCart: (_id: string) => boolean;
  totalCost: number;
  totalItems: number;
}
