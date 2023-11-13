import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import moviesApi from "../../utils/Api/MoviesApi";
import mainApi from "../../utils/Api/MainApi";
import { useScreenSize } from "../../hooks/useScreenSize";
import { getAddCount, getFilmsCount, getSlicedFilms } from "../../utils/movieDataHelper";

export default function Movies({ savedMovies, handleSavedMovies }) {
  const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
  const storedMovies = lastSearch ? lastSearch.movies : [];

  const [movies, setMovies] = useState(lastSearch ? lastSearch.movies : []);
  const [searchData, setSearchData] = useState(
    lastSearch
      ? { query: lastSearch.query, isShortOnly: lastSearch.isShortOnly }
      : {}
  );

  const screenSize = useScreenSize();

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((newMovies) => {
        handleSavedMovies(newMovies);
      })
      .catch(console.error);

    setMovies(getSlicedFilms(screenSize, movies));
    setIsShown(storedMovies.length > getFilmsCount(screenSize));
  }, []);

  useEffect(() => {
    setIsShown(storedMovies.length > getFilmsCount(screenSize));
    setMovies(getSlicedFilms(screenSize, storedMovies));
  }, [screenSize]);

  const handleSearchClick = (query, isShortOnly) => {
    moviesApi
      .getMovies()
      .then((allMovies) => {
        let filteredToStore = allMovies.filter((movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase())
        );

        if (isShortOnly) {
          filteredToStore = filteredToStore.filter((movie) => 
            movie.duration < 40)
        };

        localStorage.setItem(
          "lastSearch",
          JSON.stringify({
            movies: filteredToStore,
            query,
            isShortOnly,
          })
        );

        setMovies(getSlicedFilms(screenSize, filteredToStore));
        setIsShown(filteredToStore.length > getFilmsCount(screenSize));
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

  const isShortOnlyChange = (isChecked) => {
    const data = {
      ...searchData,
      isShortOnly: isChecked,
    };
    setSearchData(data);
  };

  const addMoreFilms = () => {
    const newCount = movies.length + getAddCount(screenSize);

    setMovies(lastSearch.movies.slice(0, newCount));
    setIsShown(lastSearch.movies.length > newCount);
  };

  return (
    <main>
      <section className="movies">
        <SearchForm
          onSearchClick={handleSearchClick}
          searchData={searchData}
          isShortOnlyChange={isShortOnlyChange}
        />
        <Preloader />
        {movies.length !== 0 && (
          <MoviesCardList
            movies={movies}
            handleOnClick={handleOnClick}
            savedMovies={savedMovies}
            addMoreFilms={addMoreFilms}
            isShown={isShown}
          />
        )}
      </section>
    </main>
  );
}
