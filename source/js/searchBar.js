// SEARCH BAR

document.addEventListener("DOMContentLoaded", () => {
    const controls = document.getElementById("controls");
  
    // Criar o Container da Searchbar
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");
  
    // Criar Input de Busca
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "search-movie";
    searchInput.placeholder = "Digite o título do filme";
    searchInput.setAttribute("aria-label", "Pesquisar filme");
  
    // Criar Botão de Busca
    const searchButton = document.createElement("button");
    searchButton.id = "search-button";
    searchButton.setAttribute("aria-label", "Pesquisar");
    searchButton.innerHTML = `<i class="fa fa-search"></i>`;
  
    // Adicionar Elementos ao Container
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);
  
    const filtersContainer = document.getElementById("filters-container");
    const favoritesContainer = document.getElementById("favorites-container");
  
    // Inserir a searchContainer entre Filtros e Favoritos
    if (filtersContainer && favoritesContainer) {
      controls.insertBefore(searchContainer, favoritesContainer);
    } else {
      controls.appendChild(searchContainer);
    }
  
    // Função de Busca
    function searchMovies(query) {
      const filteredMovies = getAllMovies().filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      renderMovies(filteredMovies);
    }
  
    // Evento de Busca no Input
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim();
      searchMovies(query);
    });
  
    // Evento de Busca no Botão
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) searchMovies(query);
    });
  });
  