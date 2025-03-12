// FAVORITES BUTTON

// FAV BUTTON
document.addEventListener("DOMContentLoaded", () => {
  const controls = document.getElementById("controls");
  const favoritesContainer = document.getElementById("favorites-container"); // Aqui
  const favoritesButton = document.createElement("button");

  // Criar botão de favoritos
  favoritesButton.id = "show-favorites";
  favoritesButton.setAttribute("aria-label", "Exibir favoritos");
  favoritesButton.textContent = "Favoritos";

  // Adicionar ao contêiner de favoritos
  favoritesContainer.appendChild(favoritesButton);

  // Lógica para o botão de favoritos, etc.
  favoritesButton.addEventListener("click", function () {
    showingFavorites = true;
    const favoriteMovies = getFavoriteMovies();
    if (favoriteMovies.length > 0) {
      renderMovies(favoriteMovies); 
    } else {
      alert("Você não tem filmes favoritos ainda.");
      showingFavorites = false;
      renderMovies(getAllMovies());
    }
  });
});

