function getQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("q");
}

function renderResults(data) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!data.RelatedTopics.length) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  data.RelatedTopics.forEach(item => {
    if (item.Text && item.FirstURL) {
      const div = document.createElement("div");
      div.className = "result-item";
      div.innerHTML = `
        <a href="${item.FirstURL}" target="_blank">${item.Text.split(" - ")[0]}</a>
        <p>${item.Text}</p>
      `;
      container.appendChild(div);
    }
  });
}

function search(query) {
  fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1`)
    .then(res => res.json())
    .then(data => renderResults(data))
    .catch(() => {
      document.getElementById("results").innerHTML = "<p>Error loading results.</p>";
    });
}

// Run on page load
const q = getQuery();
if (q) {
  document.getElementById("searchInput").value = q;
  search(q);
}

// Re-search on form submit
document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const newQuery = document.getElementById("searchInput").value;
  if (newQuery.trim()) {
    window.location.href = "results.html?q=" + encodeURIComponent(newQuery);
  }
});

