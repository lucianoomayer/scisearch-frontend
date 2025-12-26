import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import  SearchField  from '../search-field/SearchField';
import "./Header.css";

export default function Header({ handleSearch, onLoginClick, onRegisterClick, onFavoritesClick}) {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header-container">
      <div className="header-left"></div>
      <div className="header-middle">
        <h1>SciSearch</h1>
        <SearchField onSearch={handleSearch}/>
      </div>
      <div className="header-right">
        <div className="auth-group">
          {isAuthenticated ? (
            <>
              <p>Welcome, {user?.name?.split(" ")[0]}!</p>
              <button onClick={onFavoritesClick} className="button1">My Favorites</button>
              <button onClick={logout} className="button2">Log out</button>
            </>
          ) : (
            <>
              <p>Log in or Register to access your favorite articles!</p>
              <button onClick={onLoginClick} className="button1">Log in</button>
              <button onClick={onRegisterClick} className="button2">Register</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}