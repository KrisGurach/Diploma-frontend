import image from "../../../images/moviecard.svg";

export default function MoviesCard({isSaved = false}) {
  const saveButtonClass = `movieCard__save-button ${isSaved ? "movieCard__save-button_active" : "movieCard__save-button_disable"}`;
  
    return (
      <div className="movieCard">
        <img src={image} className="movieCard__image" alt="постер фильма" />
        <button className={saveButtonClass}>{isSaved ?  "" : "Сохранить" }</button>
        <div className="movieCard__description">
          <p className="movieCard__name">Баския: Взрыв реальности</p>
          <div className="movieCard__duration">
            <p className="movieCard__text">1ч 17м</p>
          </div>
        </div>
      </div>
  );
}
