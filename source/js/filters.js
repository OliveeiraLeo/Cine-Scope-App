// FILTERS

// Criação do painel de filtros
document.addEventListener("DOMContentLoaded", function() {

  const filtersContainer = document.createElement("div");
  filtersContainer.id = "filters-container";

  const filtersButton = document.createElement("button");
  filtersButton.id = "filters-button";
  filtersButton.setAttribute("aria-label", "Filtros");
  filtersButton.textContent = "Filtros";
  filtersContainer.appendChild(filtersButton);

  const filtersPanel = document.createElement("div");
  filtersPanel.id = "filters-panel";
  filtersPanel.style.display = "none";

  const genreSelect = document.createElement("select");
  genreSelect.id = "genre-filter";
  genreSelect.innerHTML = `
    <option value="">Todos</option>
    <option value="Ação">Ação</option>
    <option value="Aventura">Aventura</option>
    <option value="Comédia">Comédia</option>
    <option value="Drama">Drama</option>
    <option value="Terror">Terror</option>
    <option value="Ficção Científica">Ficção Científica</option>
    <option value="Romance">Romance</option>
    <option value="Fantasia">Fantasia</option>
    <option value="Mistério">Mistério</option>
    <option value="Animação">Animação</option>
    <option value="Documentário">Documentário</option>
  `;
  filtersPanel.appendChild(genreSelect);

  const durationSelect = document.createElement("select");
  durationSelect.id = "duration-filter";
  durationSelect.innerHTML = `
    <option value="">Duração</option>
    <option value="60">Até 60 min</option>
    <option value="120">Até 120 min</option>
    <option value="180">Até 180 min</option>
  `;
  filtersPanel.appendChild(durationSelect);

  const ratingSelect = document.createElement("select");
  ratingSelect.id = "rating-filter";
  ratingSelect.innerHTML = `
    <option value="">Avaliação</option>
    <option value="1">1⭐</option>
    <option value="2">2⭐</option>
    <option value="3">3⭐</option>
    <option value="4">4⭐</option>
    <option value="5">5⭐</option>
  `;
  filtersPanel.appendChild(ratingSelect);

  const resetButton = document.createElement("button");
  resetButton.id = "reset-filters";
  resetButton.textContent = "Resetar Filtros";
  filtersPanel.appendChild(resetButton);

  filtersContainer.appendChild(filtersPanel);

  const controlsDiv = document.getElementById("controls");
  if (controlsDiv) {
    controlsDiv.insertBefore(filtersContainer, controlsDiv.firstChild);
  }

  // Função para aplicar os filtros
  function applyFilters() {
    const genre = genreSelect.value;
    const duration = durationSelect.value;
    const rating = ratingSelect.value;

    const filteredMovies = getAllMovies().filter(movie => {
      const genreMatch = genre ? movie.genre.toLowerCase().includes(genre.toLowerCase()) : true;
      const durationMatch = duration ? movie.runtime <= parseInt(duration) : true;
      const ratingMatch = rating ? movie.voteAverage / 2 >= parseFloat(rating) : true;

      return genreMatch && durationMatch && ratingMatch;
    });

    renderMovies(filteredMovies); // Exibe os filmes filtrados
  }

  // Função para resetar os filtros
  function resetFilters() {
    genreSelect.value = "";
    durationSelect.value = "";
    ratingSelect.value = "";
    renderMovies(getAllMovies()); // Exibe todos os filmes sem filtro
  }

  // Adiciona Eventos aos Filtros
  genreSelect.addEventListener("change", applyFilters);
  durationSelect.addEventListener("change", applyFilters);
  ratingSelect.addEventListener("change", applyFilters);

  // Adiciona Evento para Resetar Filtros
  resetButton.addEventListener("click", resetFilters);

  // Fecha o Painel de Filtros com Click Fora
  document.addEventListener("click", function(event) {
    if (!filtersPanel.contains(event.target) && event.target !== filtersButton) {
      filtersPanel.style.display = "none";
    }
  });

  // Alterna Exibição do Painel de Filtros
  filtersButton.addEventListener("click", function() {
    const isVisible = filtersPanel.style.display === "block";
    filtersPanel.style.display = isVisible ? "none" : "block";
  });
});
