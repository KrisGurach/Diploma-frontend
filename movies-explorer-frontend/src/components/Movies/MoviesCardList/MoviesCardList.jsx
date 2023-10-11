import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import { savedMoviesPathname } from "../../../utils/constants";

export default function MoviesCardList({}) {
  const {pathname} = useLocation();
  const isSavedMoviesPage = pathname === savedMoviesPathname;

  return (
    <section className="movies-list__container">
      <div className={`movies-list ${pathname === savedMoviesPathname && "movies-list_type_saved-movies"}`}>
        <MoviesCard isSaved={true} />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard /> 
       <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </div>
      <div className={isSavedMoviesPage ? "movies-list__no-more-films" : "movies-list__more-films"}>
        <button className={`movies-list__more-films-button ${isSavedMoviesPage && "movies-list__more-films-button_disable"}`}>Ещё</button>
      </div>
    </section>
  );
}
