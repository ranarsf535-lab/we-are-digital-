const BASE_URL = import.meta.env.VITE_API_URL || "";

export async function fetchJSON(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);
  return res.json();
}

export async function postJSON(endpoint, data) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);
  return res.json();
}
