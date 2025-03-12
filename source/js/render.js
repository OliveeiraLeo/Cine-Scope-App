// RENDER

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let showingFavorites = false;

const favoritesButton = document.getElementById("show-favorites");

// Render dos Filmes
function renderMovies(movies) {
  moviesContainer.innerHTML = "";

  if (showingFavorites && movies.length === 0) {
    showingFavorites = false;
    renderMovies(getAllMovies());
    return;
  }
  if (showingFavorites) {
    createBackButton();
  } else {
    removeBackButton();
  }

  movies.forEach(movie => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <div class="movie-details">
        <h3>${movie.title}</h3>
        <button class="watchlist-button ${favorites.includes(movie.id) ? 'active' : ''}" data-id="${movie.id}">
          ★
        </button>
      </div>
    `;
    movieElement.addEventListener("click", () => showMovieDetails(movie));
    moviesContainer.appendChild(movieElement);
  });

  attachWatchlistEvents();
}

// Marca ou desmarca um filme como favorito
function attachWatchlistEvents() {
  document.querySelectorAll(".watchlist-button").forEach(button => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const movieId = this.getAttribute("data-id");

      // Se o filme já estiver na lista de favoritos, remove, senão adiciona
      if (favorites.includes(movieId)) {
        favorites = favorites.filter(id => id !== movieId);
      } else {
        favorites.push(movieId);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));

      // Verifica se há filmes favoritos restantes
      if (favorites.length === 0) {
        showingFavorites = false;  // Sai da tela de favoritos
        renderMovies(getAllMovies());  // Exibe todos os filmes
      } else {
        if (showingFavorites) {
          renderMovies(getFavoriteMovies());  // Se estiver na tela de favoritos, atualiza a lista de favoritos
        } else {
          renderMovies(getAllMovies());  // Caso contrário, exibe todos os filmes
        }
      }
    });
  });
}

// Obtem os filmes do localStorage
function getAllMovies() {
  return JSON.parse(localStorage.getItem("allMovies")) || [];
}

// Obtem os filmes favoritos
function getFavoriteMovies() {
  return getAllMovies().filter(movie => favorites.includes(movie.id));
}
