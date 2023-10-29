import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import moviesApi from "../../utils/Api/MoviesApi";
import mainApi from "../../utils/Api/MainApi";

export default function Movies({ savedMovies, handleSavedMovies }) {
  const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));

  const [movies, setMovies] = useState(lastSearch ? lastSearch.movies : []);

  useEffect(() => {
    mainApi.getSavedMovies()
    .then((newMovies) => {
      handleSavedMovies(newMovies);
    })
    .catch(console.error);
  }, []);

  const handleSearchClick = (query, isShortOnly) => {
    moviesApi
      .getMovies()
      .then((allMovies) => {
        const filtered = allMovies.filter((movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase())
        );
        localStorage.setItem(
          "lastSearch",
          JSON.stringify({
            movies: filtered,
            query,
            isShortOnly,
          })
        );
        setMovies(filtered);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSaveClick = (id) => {
    const movieToSend = movies.find((movie) => movie.id === id);

    mainApi
      .saveMovie(movieToSend)
      .then((savedMovie) => {
        const newMovies = [...savedMovies, savedMovie];
        handleSavedMovies(newMovies);
      })
      .catch(console.error);
  };

  return (
    <main>
      <section className="movies">
        <SearchForm onSearchClick={handleSearchClick} />
        <Preloader />
        {movies.length !== 0 && (
          <MoviesCardList
            movies={movies}
            handleOnClick={handleSaveClick}
            savedMovies={savedMovies}
          />
        )}
      </section>
    </main>
  );
}
