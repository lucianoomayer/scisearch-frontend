import React, { useState, useEffect, useRef } from 'react';
import  SearchField  from '../search-field/SearchField';
import "./Header.css";

export default function Header({ isAuthenticated, handleSearch, onLoginClick, onRegisterClick, userName, onLogout , onFavoritesClick}) {
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
              <p>Welcome, {userName.split(" ")[0]}! Find scientific articles easily.</p>
              <button onClick={onFavoritesClick} className="button1">My Favorites</button>
              <button onClick={onLogout} className="button2">Log out</button>
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