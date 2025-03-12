// MODAL

// Lógica relacionada ao modal
// Exibe os detalhes do filme ao clicar nele
function showMovieDetails(movie) {
  // Criar o modal dinamicamente
  const modal = document.createElement("div");
  modal.classList.add("movie-modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Criar e adicionar o botão de fechar
  const closeModalButton = document.createElement("button");
  closeModalButton.classList.add("close-button");
  closeModalButton.textContent = "X";

  // Criar os elementos de título e sinopse
  const movieTitle = document.createElement("h2");
  movieTitle.id = "movie-title";
  movieTitle.textContent = movie.title;

  const movieSynopsis = document.createElement("p");
  movieSynopsis.id = "movie-synopsis";
  movieSynopsis.textContent = movie.synopsis;

  // Criar o texto de duração
  const movieDuration = document.createElement("p");
  const durationText = document.createElement("span");
  const clockIcon = document.createElement("i");
  clockIcon.classList.add("fa", "fa-clock"); // Ícone de relógio
  durationText.textContent = movie.runtime && movie.runtime > 0 ? ` ${movie.runtime} min` : ` Não disponível`;

  movieDuration.classList.add("movie-duration");
  movieDuration.appendChild(clockIcon);
  movieDuration.appendChild(durationText);

  // Criar as estrelas de avaliação
  const movieRating = document.createElement("div");
  movieRating.classList.add("movie-rating");

  const rating = movie.voteAverage / 2;
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStars;

  // Criar as estrelas cheias
  for (let i = 0; i < fullStars; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    movieRating.appendChild(star);
  }

  // Criar as estrelas meio preenchidas
  for (let i = 0; i < halfStars; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star-half-alt");
    movieRating.appendChild(star);
  }

  // Criar as estrelas vazias
  for (let i = 0; i < emptyStars; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star-o");
    movieRating.appendChild(star);
  }

  // Adicionar os elementos ao conteúdo do modal
  modalContent.appendChild(closeModalButton);
  modalContent.appendChild(movieTitle);
  modalContent.appendChild(movieSynopsis);
  modalContent.appendChild(movieDuration);
  modalContent.appendChild(movieRating);
  modal.appendChild(modalContent);

  // Adicionar o modal ao body da página
  document.body.appendChild(modal);

  // Exibir o modal
  modal.style.display = "flex";

  // Fechar o modal
  closeModalButton.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.removeChild(modal); // Remover o modal do DOM após fechar
  });

  // Fechar o modal ao clicar fora dele
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.removeChild(modal); // Remover o modal do DOM
    }
  });
}

// Chama a função para buscar os filmes
fetchMovies();
