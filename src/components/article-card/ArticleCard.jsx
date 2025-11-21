import { onSave } from "../../pages/home/hooks/onSave";
import "./ArticleCard.css";

export default function ArticleCard({ article, isAuthenticated, onSaved }) { 
  async function handleSave() {
    try {
      await onSave(article);
      if (onSaved) onSaved(); 
    } catch (err) {
      alert(err.message);
    }
  }
  
  return (
    <div className="article-card">
      <div className="article-card-header">
        <a
          href={article.articleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="title"
        >
        <h3>{article.title}</h3>              
        </a>       
      <button disabled={!isAuthenticated} title="Save" className="article-save-button" onClick={handleSave}>+</button>        
      </div>   
      <div className="authors">
        <strong>Authors: </strong>
        {article.authors?.length
          ? article.authors.join(", ")
          : "N/A"}
      </div>
      <p className="pub-date">Publication Date: {article.publicationDate || "N/A"}</p>
      <p className="source">Source: {article.source || "N/A"}</p>
    </div>
  );
}
