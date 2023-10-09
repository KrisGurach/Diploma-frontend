import { useLocation } from "react-router-dom";
import image from "../../../images/moviecard.svg";

export default function MoviesCard({isSaved = false}) {
  const {pathname} = useLocation();
  const saveButtonClass = `movieCard__save-button 
  ${pathname === "/saved-movies" 
      ? "movieCard__remove-button" 
      : isSaved 
          ? "movieCard__save-button_active" 
          : "movieCard__save-button_disable"}`;

  console.log(pathname);
  console.log(saveButtonClass);     
  console.log();   
  
    return (
      <div className="movieCard">
        <img src={image} className="movieCard__image" alt="постер фильма" />
        <button className={saveButtonClass}>{isSaved || pathname === "/saved-movies"  ?  "" : "Сохранить" }</button>
        <div className="movieCard__description">
          <p className="movieCard__name">Баския: Взрыв реальности</p>
          <div className="movieCard__duration">
            <p className="movieCard__text">1ч 17м</p>
          </div>
        </div>
      </div>
  );
}
