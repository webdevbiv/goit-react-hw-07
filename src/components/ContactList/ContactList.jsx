import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import s from './ContactList.module.scss';
import { selectFilteredContacts } from '../../redux/contactsSlice';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={s.contactList}>
      {contacts.map(({ id, name, number }) => {
        return <Contact key={id} id={id} name={name} number={number} />;
      })}
    </ul>
  );
};

export default ContactList;
