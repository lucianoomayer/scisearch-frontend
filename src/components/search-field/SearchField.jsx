import React, { useState, useRef, useEffect } from 'react';
import './SearchField.css';

export default function SearchField({ onSearch }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const [anoInicial, setAnoInicial] = useState('');
  const [anoFinal, setAnoFinal] = useState('');
  const ref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), filter);
    }
  };

  const handleFilter = () => {
    const selectedFilter = { anoInicial, anoFinal };
    setFilter(selectedFilter);
    onSearch(query.trim(), selectedFilter);
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="search-bar" ref={ref}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter keywords, authors, or DOI..."
      />
      <button type="submit" className="search-button">Search</button>
      <button type="button" className="filter-button" onClick={() => setOpen(!open)}>Filter</button>
      <div className="dropdown-container">
        {open && (
          <div className="dropdown-content">
            <label htmlFor="from-year">From</label>
            <input
              id="from-year"
              type="number"
              value={anoInicial}
              onChange={(e) => setAnoInicial(e.target.value)}
            />
            <label htmlFor="to-year">To</label>
            <input
              id="to-year"
              type="number"
              value={anoFinal}
              onChange={(e) => setAnoFinal(e.target.value)}
            />
            <button type="button" className="apply-button" onClick={handleFilter}>
              Apply
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
