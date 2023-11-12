import { useEffect, useState } from "react";
import mainApi from "../../utils/Api/MainApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({ savedMovies, handleSavedMovies }) {
  const [moviesToDisplay, setMoviesToDisplay] = useState(savedMovies);

  useEffect(() => {
    setMoviesToDisplay(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((movies) => handleSavedMovies(movies))
      .catch(console.error)
  }, []);

  const handleSearchClick = (query, isShortOnly) => {
    let newMovies = savedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(query.toLowerCase())
    );

    if (isShortOnly) {
      newMovies = newMovies.filter((movie) => movie.duration < 40);
    }

    setMoviesToDisplay(newMovies);
  };

  const deleteMovie = (id, _) => {
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

  return (
    <main>
      <section className="saved-movies">
        <SearchForm
          onSearchClick={handleSearchClick}
          searchData={{}}
        />
        <MoviesCardList
          movies={moviesToDisplay}
          handleOnClick={deleteMovie}
          savedMovies={savedMovies}
          isShown={false}
        />
      </section>
    </main>
  );
}
