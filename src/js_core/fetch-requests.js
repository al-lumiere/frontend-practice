/**
 * =====================================================
 * FETCH / ASYNC PRACTICE
 *
 * Topics:
 * - fetch
 * - HTTP vs Network errors
 * - JSON parsing
 * - retry
 * - abstraction (request)
 * - UI interaction
 *
 * Notes:
 * - fetch does NOT throw on 4xx/5xx
 * - response.ok must be checked manually
 * - response.json() returns a Promise
 * =====================================================
 */


/* =====================================================
   1. Basic fetch with HTTP error handling
===================================================== */

async function getUser(id) {
  const response = await fetch(`/users/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return await response.json();
}


/* =====================================================
   2. Safe fetch (returns messages instead of throwing)
===================================================== */

async function safeFetch(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return `HTTP error: ${response.status}`;
    }

    return await response.json();
  } catch {
    return "Network error";
  }
}


/* =====================================================
   3. Fetch with retry
===================================================== */

async function fetchWithRetry(url, retries) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;

      if (attempt === retries) {
        throw lastError;
      }
    }
  }
}


/* =====================================================
   4. Basic JSON fetch
===================================================== */

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json();
}


/* =====================================================
   5. Safe JSON parsing
===================================================== */

async function fetchSafeJson(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return "HTTP error";
    }

    try {
      return await response.json();
    } catch {
      return "Invalid JSON";
    }
  } catch {
    return "Network error";
  }
}


/* =====================================================
   6. Request abstraction (recommended)
===================================================== */

async function request(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json();
}


/* =====================================================
   7. Chained requests (user -> posts)
===================================================== */

async function loadUserPosts() {
  try {
    const user = await request("/user");
    const posts = await request(`/posts/${user.id}`);

    return posts;
  } catch (error) {
    return error.message;
  }
}


/* =====================================================
   8. UI: Load user + posts
===================================================== */

const btn = document.getElementById("btn");
const out = document.getElementById("output");

btn.addEventListener("click", async () => {
  out.innerText = "Loading...";

  try {
    const user = await request("/user");
    const posts = await request(`/posts/${user.id}`);

    out.innerHTML = `
      <h1>Posts of ${user.name ?? "No name"}</h1>
      <ul>
        ${
          posts.length
            ? posts.map(post => `<li>${post.title}</li>`).join("")
            : "<li>No posts</li>"
        }
      </ul>
    `;
  } catch (error) {
    out.innerText = error.message;
  }
});