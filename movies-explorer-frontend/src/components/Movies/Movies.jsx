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

  const filterMovies = (
    allMovies = storedMovies,
    query = searchData.query,
    isShortOnly = searchData.isShortOnly
  ) => {
    let sortedMovies = allMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase())
    );

    if (isShortOnly) {
      sortedMovies = sortedMovies.filter((movie) => movie.duration <= 40);
    }

    if (sortedMovies.length === 0) {
      setMessage("Ничего не найдено");
    }

    return sortedMovies;
  };

  useEffect(() => {
    if (savedMovies.length) {
      return;
    }

    mainApi
      .getSavedMovies()
      .then((newMovies) => {
        handleSavedMovies(newMovies);
      })
      .catch(console.error);

    renderCardList(filterMovies());
  }, []);

  useEffect(() => {
    renderCardList(filterMovies());
  }, [screenSize]);

  useEffect(() => {
    if (movies.length) {
      const scrollPosition = sessionStorage.getItem('scrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem('scrollPosition');
      }
    }
  }, [savedMovies]);

  const handleSearchClick = (query) => {
    setIsLoading(true);
    setSearchData({ ...searchData, query });

    if (storedMovies.length === 0) {
      moviesApi
        .getMovies()
        .then((allMovies) => {
          localStorage.setItem(
            "lastSearch",
            JSON.stringify({
              ...lastSearch,
              movies: allMovies,
              query,
            })
          );

          const newMovies = filterMovies(allMovies, query);
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

      return;
    }

    localStorage.setItem(
      "lastSearch",
      JSON.stringify({
        ...lastSearch,
        query,
      })
    );

    const newMovies = filterMovies(storedMovies, query);
    setIsLoading(false);
    renderCardList(newMovies);
  };

  const saveMovie = (id) => {
    const movieToSave = movies.find((movie) => movie.id === id);

    setIsLoading(true);

    sessionStorage.setItem('scrollPosition', window.scrollY);

    mainApi
      .saveMovie(movieToSave)
      .then((savedMovie) => {
        const newMovies = [...savedMovies, savedMovie];
        handleSavedMovies(newMovies);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const deleteMovie = (id) => {
    const movieToDelete = savedMovies.find((movie) => movie.movieId === id);

    setIsLoading(true);

    sessionStorage.setItem('scrollPosition', window.scrollY);

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

    const newMovies = filterMovies(storedMovies, searchData.query, isChecked);
    renderCardList(newMovies);
  };

  const addMoreFilms = () => {
    const newCount = movies.length + getAddCount(screenSize);

    const newMovies = filterMovies();
    setMovies(newMovies.slice(0, newCount));
    setIsShown(newMovies.length > newCount);
  };

  return (
    <main>
      <section className="movies">
        <SearchForm
          onSearchClick={handleSearchClick}
          searchData={searchData}
          isShortOnlyChange={isShortOnlyChange}
          isLoading={isLoading}
        />
        <Preloader isLoading={isLoading} />
        {!isLoading &&
          (movies.length === 0 ? (
            <p className="not-found">
              {storedMovies.length === 0 ? "" : message}
            </p>
          ) : (
            <MoviesCardList
              movies={movies}
              handleOnClick={handleOnClick}
              savedMovies={savedMovies}
              addMoreFilms={addMoreFilms}
              isShown={isShown}
              isLoading={isLoading}
            />
          ))}
      </section>
    </main>
  );
}
