import {BaseObj} from '../types/baseObj';

export interface IUser extends BaseObj {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  },
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string
  }
};

export const userSearchKeys: (keyof IUser)[] = ['id', 'name', 'username', 'email', 'phone', 'website'];
