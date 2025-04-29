import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';

import { setNameFilter } from './redux/filtersSlice';
import {
  selectContacts,
  selectError,
  selectFilteredContacts,
  selectLoading,
  selectNameFilter,
} from './redux/selectors';
import { useEffect } from 'react';
import { addContact, deleteContact, fetchContacts } from './redux/contactsOps';
import { FadeLoader } from 'react-spinners';

const App = () => {
  const contacts = useSelector(selectContacts);
  const filteredContacts = useSelector(selectFilteredContacts);
  const userSearch = useSelector(selectNameFilter);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleUserSearch = e => {
    dispatch(setNameFilter(e.target.value));
  };

  const handleNewContact = (values, { resetForm }) => {
    const isDuplicate = contacts.some(
      contact =>
        contact.name.toLowerCase() === values.name.toLowerCase() &&
        contact.number === values.number
    );

    if (isDuplicate) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    const newContact = { ...values, id: nanoid() };
    dispatch(addContact(newContact));
    resetForm();
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm
        initialValues={{ name: '', number: '' }}
        onSubmit={handleNewContact}
      />
      <SearchBox value={userSearch} onChange={handleUserSearch} />
      {loading && <FadeLoader />}
      {error && <p>{error}</p>}
      {contacts.length === 0 && <p>No contacts found.</p>}
      {contacts.length > 0 && <p>Total contacts: {contacts.length}</p>}
      {contacts.length > 0 && (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      )}
    </>
  );
};

export default App;
