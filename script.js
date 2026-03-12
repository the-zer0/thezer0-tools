const TOTAL = 12;

  function searchTools() {
    const query = document.getElementById('searchBar').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.tool-card');
    let visible = 0;

    cards.forEach(card => {
      const match = !query || card.innerText.toLowerCase().includes(query);
      card.classList.toggle('hidden', !match);
      if (match) visible++;
    });

    const noResults = document.getElementById('noResults');
    const label = document.getElementById('categoryLabel');
    document.getElementById('noResultsQuery').textContent = query;
    noResults.classList.toggle('visible', visible === 0 && query.length > 0);

    if (query) {
      label.textContent = visible > 0 ? `${visible} result${visible !== 1 ? 's' : ''} for "${query}"` : 'No results';
    } else {
      label.textContent = `All Tools — ${TOTAL}`;
    }
  }