import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix';
import clsx from 'clsx';
import { getContacts, getFilterValue } from '../../redux/selectors';
import { deleteContact } from 'redux/contactsSlice';
import css from './ContactList.module.css';

function ContactList() {
  const filter = useSelector(getFilterValue);
  const contacts = useSelector(getContacts);

  function contactsToShow() {
    if (filter === '') {
      return contacts;
    }
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  const dispatch = useDispatch();

  if (contactsToShow().length === 0) {
      Notify.warning("Sorry but there is no results for your request!")
      return <p className={clsx(css.title)}>Sorry but there is no results for your request!</p>;
  }

  return (
    <ul className={clsx(css.list)}>
      {contactsToShow().map(({ id, name, number }) => (
        <li key={id} className={clsx(css.item)}>
          <span>
            <p className={clsx(css.parName)}>
              <span>Name: </span>
              <span className={clsx(css.name)}>{name}</span>
            </p>
            <p>
              <span>Number:</span>
              <span className={clsx(css.number)}>{number}</span>
            </p>
          </span>
          <button
            onClick={() => dispatch(deleteContact(id))}
            className={clsx(css.dellButton)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
