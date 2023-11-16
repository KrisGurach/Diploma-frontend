import { useLocation } from "react-router-dom";
import { savedMoviesPathname } from "../../utils/constants";
import { useState } from "react";

export default function MoviesCard({
  nameRU,
  duration,
  image,
  id,
  trailer,
  handleOnClick,
  savedMovies,
  isLoading
}) {
  const { pathname } = useLocation();

  const isSaved = savedMovies.some((savedMovie) => savedMovie.movieId === id);

  const saveButtonClass = `movie-card__save-button 
  ${
    pathname === savedMoviesPathname
      ? "movie-card__remove-button"
      : isSaved
      ? "movie-card__save-button_active"
      : "movie-card__save-button_disable"
  }`;

  const handleClick = () => {
    handleOnClick(id, isSaved);
  };

  const handleCardClick = () => {
    window.open(trailer, "_blank", "noreferrer");
  };

  return (
    <section className="movie-card">
      <img
        src={image}
        className="movie-card__image"
        alt="постер фильма"
        onClick={handleCardClick}
      />
      <button className={saveButtonClass} onClick={handleClick} disabled={isLoading}> 
        {isSaved || pathname === savedMoviesPathname ? "" : "Сохранить"}
      </button>
      <div className="movie-card__description">
        <h2 className="movie-card__name">{nameRU}</h2>
        <div className="movie-card__duration">
          <p className="movie-card__text">{`${Math.floor(duration / 60)}ч ${
            duration % 60
          }м`}</p>
        </div>
      </div>
    </section>
  );
}
