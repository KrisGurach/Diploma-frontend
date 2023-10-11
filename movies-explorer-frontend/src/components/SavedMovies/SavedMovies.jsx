import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

export default function SavedMovies({}) {
  return (
    <main>
      <section className="saved-movies">
        <SearchForm />
        <MoviesCardList />
      </section>
    </main>
  );
}
