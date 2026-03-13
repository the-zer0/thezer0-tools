  function searchTools() {
    const query = document.getElementById('searchBar').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.tool-card');
    const categories = document.querySelectorAll('.category');
    let totalVisible = 0;
 
    cards.forEach(card => {
      const match = !query || card.innerText.toLowerCase().includes(query);
      card.classList.toggle('hidden', !match);
      if (match) totalVisible++;
    });
 
    // Hide empty category sections when searching
    categories.forEach(cat => {
      if (!query) { cat.style.display = ''; return; }
      const visible = [...cat.querySelectorAll('.tool-card')].some(c => !c.classList.contains('hidden'));
      cat.style.display = visible ? '' : 'none';
    });
 
    const noResults = document.getElementById('noResults');
    document.getElementById('noResultsQuery').textContent = query;
    noResults.classList.toggle('visible', totalVisible === 0 && query.length > 0);
  }