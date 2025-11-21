import { createContext, useState, useContext, useEffect } from "react";
import { fetchFavoriteArticles } from "../api";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const data = await fetchFavoriteArticles(token);
      setArticles(data);
    };
    loadArticles();
  }, []);

  return (
    <FavoritesContext.Provider value={{ articles, setArticles }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}