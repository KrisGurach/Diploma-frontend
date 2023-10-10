import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import SearchForm from "./SearchForm/SearchForm";

export default function Movies({}) {
  return (
    <main>
      <section className="Movies">
        <SearchForm />
        <Preloader />
        <MoviesCardList />
        {/* <Preloader /> */}
      </section>
    </main>
  );
}
