import React, { useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import searchContext from '../../context/searchContext';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const { search, setSearch, setIsLoading, setCompanyData } =
    useContext(searchContext);
  const [searchInput, setSearchInput] = useState('Recherchez une société');

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setCompanyData(null);
    setIsLoading(true);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitSearch} className={styles.container}>
        <label htmlFor="search_bar" className={styles.label}>
          <input
            type="text"
            id="search_bar"
            className={styles.searchBarInput}
            placeholder={searchInput}
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
