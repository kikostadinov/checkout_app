export interface IProduct {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface ICartState {
  items: IProduct[];
  totalAmount: number;
  status: null | 'pending' | 'fulfilled' | 'rejected';
  error: null | string | undefined;
}

export interface IUserState {
  items: IUser;
  status: null | 'pending' | 'fulfilled' | 'rejected';
  error: null | string | undefined;
}

export interface IRootState {
  cart: ICartState;
  user: IUserState;
}

export interface IAddress {
  country: string;
  city: string;
  street: string;
}

export interface IUser extends IAddress {
  name: string;
  email: string;
  promoCode?: string;
}

export interface ICountry {
  country: string;
  cities: string[];
  iso3: string;
  iso2: string;
}

export interface ICountriesApi {
  error: boolean;
  msg: string;
  data: ICountry[][];
}
