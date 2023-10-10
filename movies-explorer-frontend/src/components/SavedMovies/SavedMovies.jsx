import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

export default function SavedMovies({}) {
  return (
    <main>
      <section className="SavedMovies">
        <SearchForm />
        <MoviesCardList />
      </section>
    </main>
  );
}
