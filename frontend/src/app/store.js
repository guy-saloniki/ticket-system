import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import ticketSlice from '../features/tickets/ticketSlice';
import noteSlice from '../features/notes/noteSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ticket: ticketSlice,
    note: noteSlice,
  },
});
