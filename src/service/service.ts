import axios from 'axios';

import { Product, CartUnit, Order } from '../models';

interface SaveOrderPayload {
  cartItems: CartUnit[];
  totalAmount: number;
}

const BASE_URL = 'https://meals-rn-app.firebaseio.com';
const PRODUCTS_URL = `${BASE_URL}/products.json`;

export async function fetchAllProducts(user?: string): Promise<Product[]> {
  const { data } = await axios.get(PRODUCTS_URL);

  const res: Product[] = data ? Object.keys(data).map(id => ({ id, ...data[id] })) : [];
  return user ? res.filter(p => p.ownerId === user) : res;
}

export async function saveProduct(productData: Omit<Product, 'id'>): Promise<string> {
  const { data } = await axios.post(PRODUCTS_URL, productData);
  return data.name;
}

export async function updateProduct(productData: Omit<Product, 'price' | 'ownerId'>) {
  await axios.patch(`${BASE_URL}/products/${productData.id}.json`, productData);
}

export async function deleteProduct(id: string) {
  await axios.delete(`${BASE_URL}/products/${id}.json`);
}

export async function fetchAllOrders(user: string): Promise<Order[]> {
  const { data } = await axios.get(`${BASE_URL}/orders/${user}.json`);

  const res: Order[] = data ? Object.keys(data).map(id => ({ id, ...data[id] })) : [];
  return res;
}

export async function saveOrder(orderData: SaveOrderPayload): Promise<string> {
  const { data } = await axios.post(`${BASE_URL}/orders/u1.json`, {
    totalAmount: orderData.totalAmount,
    items: orderData.cartItems,
    date: new Date().getTime(),
  });
  return data.name;
}
