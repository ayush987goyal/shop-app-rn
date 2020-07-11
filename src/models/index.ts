export interface Product {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export interface CartUnit {
  quantity: number;
  productId: string;
  productTitle: string;
  productPrice: number;
  sum: number;
}

export interface Order {
  id: string;
  items: CartUnit[];
  totalAmount: number;
  date: Date;
}
