import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { addContact, deleteContact, fetchContacts } from './contactsOps';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      // Fulfilled
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id
        );
        state.loading = false;
      })

      // Matcher pending
      .addMatcher(
        action =>
          [
            fetchContacts.pending,
            addContact.pending,
            deleteContact.pending,
          ].some(thunk => thunk.match(action)),
        state => {
          state.loading = true;
          state.error = null;
        }
      )
      // Matcher rejected
      .addMatcher(
        action =>
          [
            fetchContacts.rejected,
            addContact.rejected,
            deleteContact.rejected,
          ].some(thunk => thunk.match(action)),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default contactsSlice.reducer;

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectNameFilter = state => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    const normalized = nameFilter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalized)
    );
  }
);
