export interface Product {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  ownerPushToken: string | null;
}

export interface CartUnit {
  quantity: number;
  productId: string;
  productTitle: string;
  productPrice: number;
  productPushToken: string | null;
  sum: number;
}

export interface Order {
  id: string;
  items: CartUnit[];
  totalAmount: number;
  date: number;
}
