import { deleteArticle } from "../../../api";

export async function onDelete(article, setArticles) {
  try {
    const response = await deleteArticle(article.articleId);
    const msg = await response.text();

    switch (response.status) {
      case 200:
        alert(msg); 
        console.log(msg);
        setArticles(prev => prev.filter(a => a.articleId !== article.articleId));
        break;
      case 404:
        alert(msg);
        break;
      case 401:
        alert("Invalid or expired token.");
        break;
      default:
        alert(`Unexpected error: ${msg}`);
    }
  } catch (err) {
    console.error("Connection error:", err);
    alert("Server connection error.");
  }
}