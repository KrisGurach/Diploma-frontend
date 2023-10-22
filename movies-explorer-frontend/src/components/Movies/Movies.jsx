import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import moviesApi from "../../utils/Api/MoviesApi";

export default function Movies({}) {
  const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
  
  const [movies, setMovies] = useState(lastSearch ? lastSearch.movies : []);

  const handleSearchClick = (query, isShortOnly) => {
    moviesApi
      .getMovies()
      .then((allMovies) => {
        const filtered = allMovies.filter((movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase())
        );
        localStorage.setItem("lastSearch", JSON.stringify({
          movies: filtered,
          query,
          isShortOnly,
        }));
        setMovies(filtered);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main>
      <section className="movies">
        <SearchForm onSearchClick={handleSearchClick} />
        <Preloader />
        {movies.length !== 0 && <MoviesCardList movies={movies} />}
      </section>
    </main>
  );
}
