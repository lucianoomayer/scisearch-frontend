import { useState, useCallback } from "react";
import { fetchArticles as apiFetchArticles } from "../../../services/api";

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(async (term, filter = {}) => {
    if (!term.trim()) {
      setArticles([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiFetchArticles(term, filter);
      setArticles(data);
    } catch (err) {
      console.error("Error:", err.message); 
      setError(err.message || "Server connection error.");
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { articles, isLoading, error, fetchArticles };
}
