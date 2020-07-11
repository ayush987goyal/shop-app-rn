export interface Product {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export interface CartItem {
  quantity: number;
  productId: string;
  productTitle: string;
  productPrice: number;
  sum: number;
}
