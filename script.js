document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const query = document.getElementById('searchBox').value.trim();
  const iframe = document.getElementById('viewer');

  if (!query) return;

  // Basic check for URL
  const isURL = query.startsWith('http://') || query.startsWith('https://') || query.includes('.') && !query.includes(' ');

  if (isURL) {
    iframe.src = query.startsWith('http') ? query : `https://${query}`;
  } else {
    // Google search
    iframe.src = 'https://www.google.com/search?q=' + encodeURIComponent(query);
  }
});
