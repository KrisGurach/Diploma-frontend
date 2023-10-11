import { useLocation } from "react-router-dom";
import image from "../../../images/moviecard.svg";
import { savedMoviesPathname } from "../../../utils/constants";

export default function MoviesCard({ isSaved = false }) {
  const { pathname } = useLocation();
  const saveButtonClass = `movie-card__save-button 
  ${
    pathname === savedMoviesPathname
      ? "movie-card__remove-button"
      : isSaved
      ? "movie-card__save-button_active"
      : "movie-card__save-button_disable"
  }`;

  return (
    <section className="movie-card">
      <img src={image} className="movie-card__image" alt="постер фильма" />
      <button className={saveButtonClass}>
        {isSaved || pathname === savedMoviesPathname ? "" : "Сохранить"}
      </button>
      <div className="movie-card__description">
        <h2 className="movie-card__name">Баския: Взрыв реальности</h2>
        <div className="movie-card__duration">
          <p className="movie-card__text">1ч 17м</p>
        </div>
      </div>
    </section>
  );
}
