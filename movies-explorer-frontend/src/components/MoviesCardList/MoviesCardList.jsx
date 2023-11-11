import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import { savedMoviesPathname } from "../../utils/constants";

export default function MoviesCardList({
  movies,
  handleOnClick,
  savedMovies,
  addMoreFilms,
  isShown,
}) {
  const { pathname } = useLocation();
  const isSavedMoviesPage = pathname === savedMoviesPathname;

  // useEffect(() => {

  // }, [savedMovies]);

  const handleMoreFilmsClick = () => {
    addMoreFilms();
  };

  return (
    <section className="movies-list">
      <div
        className={`movies-list__container ${
          pathname === savedMoviesPathname
            ? "movies-list__container_type_saved-movies"
            : ""
        }`}
      >
        {movies.map((movie) => {
          return (
            <MoviesCard
              key={movie.id}
              nameRU={movie.nameRU}
              duration={movie.duration}
              image={movie.image.url}
              id={movie.id}
              handleOnClick={handleOnClick}
              savedMovies={savedMovies}
            />
          );
        })}
      </div>
      <div
        className={
          isSavedMoviesPage
            ? "movies-list__no-more-films"
            : "movies-list__more-films"
        }
      >
        {isShown && (
          <button
            className={`movies-list__more-films-button ${
              isSavedMoviesPage ? "movies-list__more-films-button_disable" : ""
            }`}
            onClick={handleMoreFilmsClick}
          >
            Ещё
          </button>
        )}
      </div>
    </section>
  );
}
