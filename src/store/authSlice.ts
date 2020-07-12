import { createSlice } from '@reduxjs/toolkit';

interface AuthState {}

const initialState: AuthState = {};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
