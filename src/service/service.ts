import axios from 'axios';
import Constants from 'expo-constants';

import { Product, CartUnit, Order } from '../models';

interface SaveProductPayload {
  productData: Omit<Product, 'id'>;
  token: string | null;
}

interface UpdateProductPayload {
  productData: Omit<Product, 'price' | 'ownerId' | 'ownerPushToken'>;
  token: string | null;
}

interface SaveOrderPayload {
  cartItems: CartUnit[];
  totalAmount: number;
  userId: string | null;
  token: string | null;
}

const BASE_URL = 'https://meals-rn-app-7b24f.firebaseio.com/';
const API_KEY = Constants.manifest.extra.apiKey;

export async function fetchAllProducts(user: string | null): Promise<Product[]> {
  const { data } = await axios.get(`${BASE_URL}/products.json`);

  const res: Product[] = data ? Object.keys(data).map(id => ({ id, ...data[id] })) : [];
  return user ? res.filter(p => p.ownerId === user) : res;
}

export async function saveProduct({ productData, token }: SaveProductPayload): Promise<string> {
  const { data } = await axios.post(`${BASE_URL}/products.json?auth=${token}`, productData);
  return data.name;
}

export async function updateProduct({ productData, token }: UpdateProductPayload) {
  await axios.patch(`${BASE_URL}/products/${productData.id}.json?auth=${token}`, productData);
}

export async function deleteProduct(id: string, token: string | null) {
  await axios.delete(`${BASE_URL}/products/${id}.json?auth=${token}`);
}

export async function fetchAllOrders(user: string | null): Promise<Order[]> {
  const { data } = await axios.get(`${BASE_URL}/orders/${user}.json`);

  const res: Order[] = data ? Object.keys(data).map(id => ({ id, ...data[id] })) : [];
  return res;
}

export async function saveOrder(orderData: SaveOrderPayload): Promise<string> {
  const { totalAmount, cartItems, token, userId } = orderData;

  const { data } = await axios.post(`${BASE_URL}/orders/${userId}.json?auth=${token}`, {
    totalAmount,
    items: cartItems,
    date: new Date().getTime(),
  });
  return data.name;
}

export async function authenticate(authData: {
  email: string;
  password: string;
  isLogin: boolean;
}) {
  const { email, password, isLogin } = authData;

  try {
    const { data } = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${
        isLogin ? 'signInWithPassword' : 'signUp'
      }?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    return { token: data.idToken, expiresIn: data.expiresIn, userId: data.localId };
  } catch (err) {
    const errorRes = err.response.data;
    const errorId = errorRes.error.message;
    let message = '';

    console.log('yo error', errorRes);
    switch (errorId) {
      case 'EMAIL_NOT_FOUND':
        message = 'This email could not be found!';
        break;
      case 'INVALID_PASSWORD':
        message = 'This password is not valid!';
        break;
      case 'EMAIL_EXISTS':
        message = 'This email already exists!';
        break;
      default:
        message = 'Something went wrong!';
    }

    throw new Error(message);
  }
}

export function sendPushNotifications(cartItems: CartUnit[]) {
  const requests = cartItems.map(item =>
    axios.post(
      'https://exp.host/--/api/v2/push/send',
      {
        to: item.productPushToken,
        title: 'Order was placed!',
        body: item.productTitle,
      },
      {
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflat',
          'Content-Type': 'application/json',
        },
      }
    )
  );

  Promise.all(requests);
}
