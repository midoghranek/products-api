export class Category {
  name: string;
}

export class Product {
  name: string;
  price: number;
  image: string;
  category: Category;
}

export interface User {
  name: string;
  username: string;
  avatar: string;
  role: 'manager' | 'editor';
  password: string;
}
