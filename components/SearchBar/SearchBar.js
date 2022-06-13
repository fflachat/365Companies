import React, { useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import searchContext from '../../context/searchContext';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const { setSearch, setIsLoading, setCompanyData } = useContext(searchContext);
  const [searchInput, setSearchInput] = useState();

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const submitSearch = (e) => {
    if (searchInput) {
      e.preventDefault();
      setSearch(searchInput);
      setCompanyData(null);
      setIsLoading(true);
    } else window.alert("Merci de préciser le nom d'une société");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitSearch} className={styles.container}>
        <label htmlFor="search_bar" className={styles.label}>
          <input
            type="text"
            id="search_bar"
            className={styles.searchBarInput}
            placeholder="Recherchez une société"
            onChange={handleSearch}
          />
        </label>
        <button className={styles.submitBtn} type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
