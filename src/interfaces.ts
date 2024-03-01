export interface IProduct {
  id: string;
  title: string;
  price: number;
}

export interface ICartState {
  items: IProduct[];
  status: null | 'pending' | 'fulfilled' | 'rejected';
  error: null | string | undefined;
}

export interface IRootState {
  cart: ICartState;
}

// Form fields //
export interface IAddress {
  country: string;
  city: string;
}

export interface IUser extends IAddress {
  name: string;
  email: string;
  promoCode?: string;
}
