import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SetAuthDataPayload {
  token: string;
  userId: string;
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
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
  },
});

export const { setAuthData } = authSlice.actions;

export default authSlice.reducer;
