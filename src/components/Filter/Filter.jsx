import clsx from 'clsx'
import { useDispatch } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';
import css from './Filter.module.css'

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const value = evt.target.value;
    dispatch(changeFilter(value))
  }
    return (
      <label className={clsx(css.filter)}>
        <span className={clsx(css.label)}>Filter by name</span>
        <input
          type="text"
          name="filter"
          onChange={handleChange}
          className={clsx(css.input)}
        />
      </label>
    );
  };

export default Filter;