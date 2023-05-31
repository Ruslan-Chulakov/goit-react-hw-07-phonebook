import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix';
import { Circles } from 'react-loader-spinner';
import clsx from 'clsx';
import {
  getContacts,
  getError,
  getFilterValue,
  getIsLoading,
} from '../../redux/selectors';
import { deleteContact } from 'redux/operations';
import css from './ContactList.module.css';

const ContactList = () => {
  const filter = useSelector(getFilterValue);
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  if (error) {
    Notify.failure(`${error}`)
  }

  function contactsToShow() {
    if (filter === '') {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const dispatch = useDispatch();

  if (contactsToShow().length === 0) {
    Notify.warning('Sorry but there is no results for your request!');
    return (
      <p className={clsx(css.title)}>
        Sorry but there is no results for your request!
      </p>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={clsx(css.loader)}>
          <Circles
            height="50"
            width="50"
            color="#3dc7fd"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      <ul className={clsx(css.list)}>
        {contacts &&
          contactsToShow().map(({ id, name, number }) => (
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
        {error && <li className={clsx(css.error)}>Whoops: {error}</li>}
      </ul>
    </>
  );
}

export default ContactList;
