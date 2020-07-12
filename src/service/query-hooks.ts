import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useFocusEffect } from '@react-navigation/native';

import { fetchAllProducts, fetchAllOrders } from './service';

export const FETCH_ALL_PRODUCTS_KEY = 'fetchAllProducts';
export const FETCH_ALL_ORDERS_KEY = 'fetchAllOrders';

export function useRefetchOnFocus(refetch: () => void) {
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );
}

export function useProducts(user?: string) {
  return useQuery(
    [FETCH_ALL_PRODUCTS_KEY, { user }],
    async (key, { user: userId }) => await fetchAllProducts(userId)
  );
}

export function useOrders(user: string) {
  return useQuery(
    [FETCH_ALL_ORDERS_KEY, { user }],
    async (key, { user: userId }) => await fetchAllOrders(userId)
  );
}
