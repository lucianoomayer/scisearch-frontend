import React, { useState, useEffect } from "react";
import { fetchFavoriteArticles } from "./../../api";
import "./SidebarArticles.css";

export default function SideBarArticles({ onClose, onDelete, onRefresh }) {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadArticles = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }
    try {
      const data = await fetchFavoriteArticles();
      setArticles(data);
    } catch (err) {
      console.error("Error loading favorites:", err);
      setError("Error loading favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    if (onRefresh) {
      onRefresh(loadArticles);
    }
  }, [onRefresh]);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
        <h2>My Articles</h2>
        <button className="close-button" onClick={onClose}>x</button>
      </div>

      <input
        type="text"
        className="input"
        placeholder="Filter by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="sidebar-content">
        {loading ? (
          <p className="empty-message">Loading...</p>
        ) : error ? (
          <p className="empty-message">{error}</p>
        ) : filteredArticles.length === 0 ? (
          <p className="empty-message">No articles found.</p>
        ) : (
          filteredArticles.map((article) => (
            <div className="sidebar-card" key={article.articleId}>
              <div className="header">
                <h3>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h3>
                <button title="Remove" className="delete-button" onClick={() => onDelete(article, setArticles)}>x</button>
              </div>
              <p>Publication Date: {article.publicationDate}</p>
              <p>Source: {article.source || "N/A"}</p>
              <p>Saved in: {article.favoriteAt}</p>
            </div>  
          ))
        )}
      </div>
    </aside>
  );
}
