export interface ICart {
  _id: string;
  title: string;
  price: number;
  image: string;
}

export interface ICartStore {
  cart: ICart[];
  addCourse: (course: ICart) => void;
  removeCourse: (_id: string) => void;
  setCart: (cart: ICart[]) => void;
  clearCart: () => void;
  totalCost: number;
  totalItems: number;
}
