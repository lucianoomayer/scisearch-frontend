import { BASE_USER_URL, BASE_ARTICLE_URL } from "./config.jsx";

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_USER_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Incorrect username and/or password");
  const data = await response.json();
  localStorage.setItem("access_token", data.token);
  return data;
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
  
  const response = await fetch(`${BASE_ARTICLE_URL}/search?${params.toString()}`,{
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
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token not found");

  const response = await fetch(`${BASE_ARTICLE_URL}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
        articleId: article.articleId,
        title: article.title,
        url: article.articleUrl,
        source: article.source,
        publicationDate: article.publicationDate
      })
  });

  return response;
}

export const fetchFavoriteArticles = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token not found");

  const response = await fetch(`${BASE_ARTICLE_URL}/favorites`, {
    headers: {
      method: "GET",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error retrieving favorite articles: ${response.status}`);
  }

  return await response.json();
};


export const deleteArticle = async (articleId) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token not found");

  const response = await fetch(`${BASE_ARTICLE_URL}/favorites/delete?articleId=${encodeURIComponent(articleId)}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  );

  return response;
}  