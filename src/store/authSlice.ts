import { AsyncStorage } from 'react-native';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SetAuthDataPayload {
  token: string;
  userId: string;
  expiresIn: number;
}

interface AuthState {
  token: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  token: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<SetAuthDataPayload>) => {
      const { token, userId } = action.payload;
      state.token = token;
      state.userId = userId;
      saveDataToStorage(action.payload);
    },

    clearAuthData: state => {
      state.token = null;
      state.userId = null;
      AsyncStorage.removeItem('authData');
    },
  },
});

function saveDataToStorage({ token, userId, expiresIn }: SetAuthDataPayload) {
  const expiryDate = new Date(new Date().getTime() + expiresIn * 1000).toISOString();

  AsyncStorage.setItem('authData', JSON.stringify({ token, userId, expiryDate }));
}

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
