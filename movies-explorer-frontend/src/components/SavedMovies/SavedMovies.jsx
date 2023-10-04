import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

export default function SavedMovies({}) {
  return (
    <div className="SavedMovies">
      <SearchForm />
      <MoviesCardList />
    </div>
  );
}
