import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useUser } from '@clerk/clerk-react';

const { user } = useUser();
const clerkID = user?.id;

export const fetchBoostCoins = createAsyncThunk('boostCoins/fetchBoostCoins', async () => {
  const response = await fetch(`/api/user/boostCoins?clerkID=${clerkID}`);
  const data = await response.json();
  return data.boostCoins;
});

const boostCoinsSlice = createSlice({
  name: 'boostCoins',
  initialState: {
    value: 0,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoostCoins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBoostCoins.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchBoostCoins.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectBoostCoins = (state: any) => state.boostCoins.value;

export default boostCoinsSlice.reducer;
