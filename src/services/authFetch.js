let onUnauthorized = null;

export function setOnUnauthorized(callback) {
  onUnauthorized = callback;
}

export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    onUnauthorized();
    alert("Session expired. Please log in again.");
    throw new Error("Session expired");
  }

  return response;
}
