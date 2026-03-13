// Thezer0 Tools — Search
// Drop this as <script src="search.js"></script> before </body>
// OR paste the contents into your existing <script> block.

(function () {
  var searchInput = document.getElementById('searchBar');

  if (!searchInput) {
    console.warn('[search.js] No element with id="searchBar" found.');
    return;
  }

  // Build a flat index of every card at startup (after DOM is ready)
  var cardIndex = [];

  function buildIndex() {
    cardIndex = [];
    document.querySelectorAll('.tool-card').forEach(function (card) {
      var heading = card.querySelector('h2');
      var desc    = card.querySelector('p');
      cardIndex.push({
        el:      card,
        text:    [
          heading ? heading.textContent : '',
          desc    ? desc.textContent    : '',
          card.getAttribute('href') || ''
        ].join(' ').toLowerCase()
      });
    });
  }

  function searchTools() {
    var query = searchInput.value.trim().toLowerCase();

    var totalVisible = 0;

    cardIndex.forEach(function (item) {
      var match = !query || item.text.includes(query);
      item.el.classList.toggle('hidden', !match);
      if (match) totalVisible++;
    });

    // Show / hide entire category rows
    document.querySelectorAll('.category').forEach(function (cat) {
      if (!query) {
        cat.style.display = '';
        return;
      }
      var hasVisible = Array.from(
        cat.querySelectorAll('.tool-card')
      ).some(function (c) {
        return !c.classList.contains('hidden');
      });
      cat.style.display = hasVisible ? '' : 'none';
    });

    // No-results message
    var noResults = document.getElementById('noResults');
    var noResultsQuery = document.getElementById('noResultsQuery');
    if (noResults) {
      if (noResultsQuery) noResultsQuery.textContent = query;
      noResults.classList.toggle('visible', totalVisible === 0 && query.length > 0);
    }
  }

  // Wire up events
  searchInput.addEventListener('input',   searchTools);
  searchInput.addEventListener('keydown', function (e) {
    // Clear on Escape
    if (e.key === 'Escape') {
      searchInput.value = '';
      searchTools();
      searchInput.blur();
    }
  });

  // Focus search on "/" keypress (like GitHub)
  document.addEventListener('keydown', function (e) {
    if (
      e.key === '/' &&
      document.activeElement !== searchInput &&
      document.activeElement.tagName !== 'INPUT' &&
      document.activeElement.tagName !== 'TEXTAREA'
    ) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  // Build index after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildIndex);
  } else {
    buildIndex();
  }

  // Expose globally so the inline oninput="searchTools()" still works
  window.searchTools = searchTools;
})();