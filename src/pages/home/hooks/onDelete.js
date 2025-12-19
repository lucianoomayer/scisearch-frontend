import { deleteArticle } from "../../../services/api";

export async function onDelete(article, setArticles) {
  try {
    const response = await deleteArticle(article.articleId);

    if (response.ok) {
      alert("Article removed successfully.");
      setArticles(prev =>
        prev.filter(a => a.articleId !== article.articleId)
      );
      return;
    }

    if (response.status === 404) {
      alert("Article not found.");
      return;
    }

    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete article");

  } catch (err) {
    console.error("Delete error:", err);
    
    if (err.message === "Session expired") {
      return;
    }

    alert("Server connection error. Please try again later.");
  }
}
