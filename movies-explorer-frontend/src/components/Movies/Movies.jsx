import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import moviesApi from "../../utils/Api/MoviesApi";
import mainApi from "../../utils/Api/MainApi";
import { useScreenSize } from "../../hooks/useScreenSize";
import {
  getAddCount,
  getFilmsCount,
  getSlicedFilms,
} from "../../utils/movieDataHelper";

export default function Movies({ savedMovies, handleSavedMovies }) {
  const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
  const storedMovies = !lastSearch
    ? []
    : lastSearch.movies
    ? lastSearch.movies
    : [];

  const [movies, setMovies] = useState(storedMovies);
  const [isShown, setIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchData, setSearchData] = useState(
    lastSearch
      ? {
          query: lastSearch.query,
          isShortOnly: lastSearch.isShortOnly || false,
        }
      : {}
  );

  const screenSize = useScreenSize();

  const renderCardList = (newMovies) => {
    if (!newMovies) {
      newMovies = [];
    }

    setMovies(getSlicedFilms(screenSize, newMovies));
    setIsShown(newMovies.length > getFilmsCount(screenSize));
  };

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((newMovies) => {
        handleSavedMovies(newMovies);
      })
      .catch(console.error);

    renderCardList(storedMovies);
  }, []);

  useEffect(() => {
    let newMovies = storedMovies;

    if (searchData.isShortOnly) {
      newMovies = newMovies.filter((movie) => movie.duration <= 40);
    }

    renderCardList(newMovies);
  }, [screenSize]);

  const handleSearchClick = (query) => {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((allMovies) => {
        let filteredToStore = allMovies.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(query.toLowerCase())
        );

        let newMovies = filteredToStore;
        if (searchData.isShortOnly) {
          newMovies = filteredToStore.filter((movie) => movie.duration <= 40);
        }

        localStorage.setItem(
          "lastSearch",
          JSON.stringify({
            ...lastSearch,
            movies: filteredToStore,
            query,
          })
        );

        setMessage("Ничего не найдено.");

        renderCardList(newMovies);
      })
      .catch((error) => {
        setMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. " +
            "Подождите немного и попробуйте ещё раз"
        );
        console.error(error);
      })
      .finally(() => setIsLoading(false));
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

    localStorage.setItem(
      "lastSearch",
      JSON.stringify({
        ...lastSearch,
        isShortOnly: isChecked,
      })
    );

    let newMovies = storedMovies;
    if (isChecked) {
      newMovies = newMovies.filter((movie) => movie.duration <= 40);
    }

    renderCardList(newMovies);
  };

  const addMoreFilms = () => {
    const newCount = movies.length + getAddCount(screenSize);

    setMovies(storedMovies.slice(0, newCount));
    setIsShown(storedMovies.length > newCount);
  };

  return (
    <main>
      <section className="movies">
        <SearchForm
          onSearchClick={handleSearchClick}
          searchData={searchData}
          isShortOnlyChange={isShortOnlyChange}
        />
        <Preloader isLoading={isLoading} />
        {!isLoading &&
          (storedMovies.length === 0 ? (
            <p className="not-found">{message}</p>
          ) : (
            <MoviesCardList
              movies={movies}
              handleOnClick={handleOnClick}
              savedMovies={savedMovies}
              addMoreFilms={addMoreFilms}
              isShown={isShown}
            />
          ))}
      </section>
    </main>
  );
}
