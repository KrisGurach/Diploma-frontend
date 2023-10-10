import { useLocation } from "react-router-dom";
import image from "../../../images/moviecard.svg";
import { savedMoviesPathname } from "../../../utils/constants";

export default function MoviesCard({ isSaved = false }) {
  const { pathname } = useLocation();
  const saveButtonClass = `movieCard__save-button 
  ${
    pathname === savedMoviesPathname
      ? "movieCard__remove-button"
      : isSaved
      ? "movieCard__save-button_active"
      : "movieCard__save-button_disable"
  }`;

  console.log(pathname);
  console.log(saveButtonClass);
  console.log();

  return (
    <section className="movieCard">
      <img src={image} className="movieCard__image" alt="постер фильма" />
      <button className={saveButtonClass}>
        {isSaved || pathname === savedMoviesPathname ? "" : "Сохранить"}
      </button>
      <div className="movieCard__description">
        <h2 className="movieCard__name">Баския: Взрыв реальности</h2>
        <div className="movieCard__duration">
          <p className="movieCard__text">1ч 17м</p>
        </div>
      </div>
    </section>
  );
}
