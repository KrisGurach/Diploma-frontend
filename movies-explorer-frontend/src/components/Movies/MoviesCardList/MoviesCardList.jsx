import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import { savedMoviesPathname } from "../../../utils/constants";

export default function MoviesCardList({}) {
  const {pathname} = useLocation();
  const isSavedMoviesPage = pathname === savedMoviesPathname;

  return (
    <section className="moviesCardList__container">
      <div className={`moviesCardList ${pathname === savedMoviesPathname && "movieCardList_type_saved-movies"}`}>
        <MoviesCard isSaved={true} />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        { /*<MoviesCard />
        <MoviesCard />
        <MoviesCard /> */}
       {/* <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard /> */}
      </div>
      <div className={isSavedMoviesPage ? "moviesCardList__noMoreFilms" : "moviesCardList__moreFilms"}>
        <button className={`moviesCardList__moreFilms-button ${isSavedMoviesPage && "movieCardList__moreFilms-button_disable"}`}>Ещё</button>
      </div>
    </section>
  );
}
