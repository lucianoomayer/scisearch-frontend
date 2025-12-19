import { saveArticle } from "../../../services/api";

export async function onSave(article, sidebarRefresh) {
  try {
    const response = await saveArticle(article);

    if (response.ok) {
      alert("Article favorited successfully!");
      sidebarRefresh?.();
      return;
    }

    if (response.status === 409) {
      alert("This article has already been favorited.");
      return;
    }

    const errorText = await response.text();
    throw new Error(errorText || "Failed to save article");

  } catch (err) {
    console.error("Save article error:", err);

    if (err.message === "Session expired") {
      return;
    }

    alert("Server connection error. Please try again later.");
  }
}
