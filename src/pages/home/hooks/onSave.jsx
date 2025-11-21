import { saveArticle } from "../../../api";

export async function onSave(article, sidebarRefresh) {
  try {
    const response = await saveArticle(article);

    switch (response.status) {
      case 201: {
        const data = await response.json(); 
        console.log("Article saved:", data);
        alert("Article successfully favorited!");
        if (sidebarRefresh) sidebarRefresh();
        break;
      }
      case 409:
        alert("This article has already been favorited.");
        break;
      case 401:
        alert("Invalid or expired token.");
        break;
      default: {
        const errorText = await response.text();
        alert(`Error saving favorite: ${errorText}`);
      }
    }
  } catch (err) {
    console.error(err);
    alert("Server connection error.");
  }
}