import { useDispatch, useSelector } from 'react-redux';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';

import {
  selectContacts,
  selectError,
  selectLoading,
} from './redux/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from './redux/contactsOps';
import { FadeLoader } from 'react-spinners';

const App = () => {
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && <FadeLoader />}
      {error && <p>{error}</p>}
      {contacts.length === 0 && <p>No contacts found.</p>}
      {contacts.length > 0 && <p>Total contacts: {contacts.length}</p>}
      {contacts.length > 0 && <ContactList />}
    </>
  );
};

export default App;
