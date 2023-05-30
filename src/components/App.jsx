import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from './Filter';
import css from './App.module.css';

export const App = () => {
  const contacts = useSelector(getContacts)
  
  return (
    <div className={clsx(css.container)}>
      <span className={clsx(css.titleSpan)}>
        <h1 className={clsx(css.title)}>Phonebook</h1>
      </span>
      <ContactForm />
      {contacts.length !== 0 && (
        <span className={clsx(css.titleSpan)}>
          <h2 className={clsx(css.title)}>Contacts</h2>
        </span>
      )}
      {contacts.length > 2 && <Filter />}
      {contacts.length !== 0 && (
        <ContactList />
      )}
    </div>
  );
};
