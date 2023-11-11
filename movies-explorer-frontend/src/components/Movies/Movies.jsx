import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import moviesApi from "../../utils/Api/MoviesApi";
import mainApi from "../../utils/Api/MainApi";
import { screenSizeEnum } from "../../utils/enums";
import { useScreenSize } from "../../hooks/useScreenSize";

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


    let count;
    switch (screenSize) {
      case screenSizeEnum.L:
        count = 12;
        break;
      case screenSizeEnum.M:
        count = 8;
        break;
      case screenSizeEnum.S:
        count = 5;
        break;
      default:
        count = storedMovies.length;
        break;
    }  
    const newSortedMovies = movies.slice(0, count); 
    setMovies(newSortedMovies);

    setIsShown(storedMovies.length > count);
  }, []);

  useEffect(() => {
    let count;
    switch (screenSize) {
      case screenSizeEnum.L:
        count = 12;
        break;
      case screenSizeEnum.M:
        count = 8;
        break;
      case screenSizeEnum.S:
        count = 5;
        break;
      default:
        count = storedMovies.length;
        break;
    }  

    setIsShown(storedMovies.length > count);

    setMovies(storedMovies.slice(0, count));
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

        let count;
        switch (screenSize) {
          case screenSizeEnum.L:
            count = 12;
            break;
          case screenSizeEnum.M:
            count = 8;
            break;
          case screenSizeEnum.S:
            count = 5;
            break;
          default:
            count = storedMovies.length;
            break;
        } 

        const filtered = filteredToStore.slice(0, count);
        setMovies(filtered);

        setIsShown(filteredToStore.length > count);
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

    console.log(data);
    
    setSearchData(data);
  };

  const addMoreFilms = () => {
    setMovies(lastSearch.movies);
    setIsShown(false);
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
