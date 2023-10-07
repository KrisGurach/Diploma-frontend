import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({}) {
  return (
    <div className="moviesCardList__container">
      <div className="moviesCardList">
        <MoviesCard isSaved={true} />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        {/* <MoviesCard />
        <MoviesCard />
        <MoviesCard /> */}
        {/* <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard /> */}
      </div>
      <div className="moviesCardList__moreFilms">
        <button className="moviesCardList__moreFilms-button">Ещё</button>
      </div>
    </div>
  );
}
