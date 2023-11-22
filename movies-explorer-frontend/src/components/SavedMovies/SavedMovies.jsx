import { useEffect, useState } from "react";
import mainApi from "../../utils/Api/MainApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({ savedMovies, handleSavedMovies }) {
  const [moviesToDisplay, setMoviesToDisplay] = useState(savedMovies);
  const [isShortOnly, setIsShortOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filterMovies = (query, isShortOnly) => {
    let newMovies = savedMovies;

    if (query !== "") {
      newMovies = newMovies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (isShortOnly) {
      newMovies = newMovies.filter((movie) => movie.duration <= 40);
    }

    setMoviesToDisplay(newMovies);
  }

  useEffect(() => {
    if (savedMovies.length) {
      return;
    }

    mainApi
      .getSavedMovies()
      .then((movies) => handleSavedMovies(movies))
      .catch(console.error);
  }, []);

  useEffect(() => {
    filterMovies(query, isShortOnly);
  }, [savedMovies]);

  const handleSearchClick = (query) => {
    setQuery(query);
    filterMovies(query, isShortOnly);
  };

  const isShortOnlyChange = (isChecked) => {
    setIsShortOnly(isChecked);
    filterMovies(query, isChecked);
  };

  const deleteMovie = (id, _) => {
    const movieToDelete = savedMovies.find((movie) => movie.movieId === id);
    setIsLoading(true);

    mainApi
      .deleteMovie(movieToDelete._id)
      .then(() => {
        const newMovies = savedMovies.filter(
          (savedMovie) => savedMovie.movieId !== id
        );
        handleSavedMovies(newMovies);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <main>
      <section className="saved-movies">
        <SearchForm
          onSearchClick={handleSearchClick}
          searchData={{ isShortOnly }}
          isShortOnlyChange={isShortOnlyChange}
        />
        <MoviesCardList
          movies={moviesToDisplay}
          handleOnClick={deleteMovie}
          savedMovies={savedMovies}
          isShown={false}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
}
