import React, { useState } from 'react';
import './SearchField.css';
import DropdownMenu from '../dropdown-menu/DropdownMenu'

export default function SearchField({ onSearch }) {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState({});
      
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim(), filter);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter keywords, authors, or DOI..."               
            />       
            <button type="submit" className="search-button">
                Buscar
            </button>
            <DropdownMenu onSelect={(selectedFilter) => {
                setFilter(selectedFilter);
                onSearch(query.trim(), selectedFilter); 
            }}/>
        </form>
    );
}