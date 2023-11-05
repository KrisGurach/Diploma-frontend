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
    mainApi
      .getSavedMovies()
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

  const saveMovie = (id) => {
    const movieToSave = movies.find((movie) => movie.id === id);

    mainApi
      .saveMovie(movieToSave)
      .then((savedMovie) => {
        const newMovies = [...savedMovies, savedMovie];
        handleSavedMovies(newMovies);
      })
      .catch(console.error);
  };

  const deleteMovie = (id) => {
    const movieToDelete = savedMovies.find((movie) => movie.movieId === id);

    mainApi
      .deleteMovie(movieToDelete._id)
      .then(() => {
        const newMovies = savedMovies.filter(
          (savedMovie) => savedMovie.movieId !== id
        );
        handleSavedMovies(newMovies);
      })
      .catch(console.error);
  };

  const handleOnClick = (id, isSaved) => {
    isSaved ? deleteMovie(id) : saveMovie(id);
  };

  return (
    <main>
      <section className="movies">
        <SearchForm onSearchClick={handleSearchClick} />
        <Preloader />
        {movies.length !== 0 && (
          <MoviesCardList
            movies={movies}
            handleOnClick={handleOnClick}
            savedMovies={savedMovies}
          />
        )}
      </section>
    </main>
  );
}
