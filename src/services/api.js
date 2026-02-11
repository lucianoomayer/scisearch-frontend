import { BASE_USER_URL, BASE_ARTICLE_URL, BASE_ARTICLE_FAVORITE_URL } from "../config.jsx";
import { authFetch } from "./authFetch.js";

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_USER_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Invalid credentials");

  return await response.json();
};

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${BASE_USER_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) throw new Error("Email already registered");
  return response.json();
};

export const fetchArticles = async (query, filter = {}) => {
  const params = new URLSearchParams(); 
  params.append("query", query);

  if (filter?.anoInicial !== undefined) { params.append("startYear", filter.anoInicial); } 
  if (filter?.anoFinal !== undefined) { params.append("endYear", filter.anoFinal); }
  
  const response = await fetch(`${BASE_ARTICLE_URL}?${params.toString()}`,{
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
  
  if (!response.ok) {
    let errorMessage = "Error retrieving articles.";
    try {
      const body = await response.json();
      if (body?.error) {
        errorMessage = body.error;
        console.log(errorMessage);
      }
    } catch (e) {
    }
    throw new Error(errorMessage);
  }
  return await response.json();
}

export const saveArticle = async (article) => {
  const response = await authFetch(`${BASE_ARTICLE_FAVORITE_URL}`, {
    method: "POST",
    body: JSON.stringify({
        externalId: article.externalId,
        title: article.title,
        url: article.url,
        publicationYear: article.publicationYear,
        source: article.source   
      })
  });

  return response;
}

export const fetchFavoriteArticles = async () => {
  const response = await authFetch(`${BASE_ARTICLE_FAVORITE_URL}`, {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error(`Error retrieving favorite articles: ${response.status}`);
  }

  return await response.json();
};


export const deleteArticle = async (favoriteId) => {
  const response = await authFetch(`${BASE_ARTICLE_FAVORITE_URL}/${favoriteId}`,
    {
      method: "DELETE",
    }
  );

  return response;
}  