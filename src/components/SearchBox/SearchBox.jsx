import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import s from './SearchBox.module.scss';
const SearchBox = () => {
  const value = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={s.searchBox}>
      <p>Find contacts by name</p>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default SearchBox;
