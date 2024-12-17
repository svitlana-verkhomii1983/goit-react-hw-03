import styles from './SearchBox.module.css';

const SearchBox = ({ filter, setFilter, setIsSearchFocused }) => {
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFocus = () => {
    setIsSearchFocused(true);
  };

  const handleBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <div>
      <label>Find contacts by name</label>
      <input
        type="text"
        className={styles.input}
        value={filter}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;