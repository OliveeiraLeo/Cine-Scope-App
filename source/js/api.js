// API 

const moviesContainer = document.getElementById("movies-container");
 
 // Formata os gêneros durante o request
 async function fetchMovies() {
  try {
    let allMovies = [];

    for (let page = 1; page <= 3; page++) {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a6b8ac652803f0e23a419989400f4a98&language=pt-BR&page=${page}`);
      const data = await response.json();

      const movies = await Promise.all(data.results.map(async movie => {
        const movieDetailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=a6b8ac652803f0e23a419989400f4a98&language=pt-BR`);
        const movieDetails = await movieDetailsResponse.json();

        return {
          id: movie.id.toString(),
          title: movie.title,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          synopsis: movie.overview,
          runtime: movieDetails.runtime || 'Duração não disponível',
          voteAverage: movieDetails.vote_average,
          genre: movieDetails.genres.map(genre => genre.name).join(', ')
        };
      }));

      allMovies = [...allMovies, ...movies];
    }

    localStorage.setItem("allMovies", JSON.stringify(allMovies));
    renderMovies(allMovies);  // Renderiza os filmes
  } catch (error) {
    console.error("Erro ao buscar filmes", error);
  }
}