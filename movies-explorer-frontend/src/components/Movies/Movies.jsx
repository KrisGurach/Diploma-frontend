import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import SearchForm from "./SearchForm/SearchForm";

export default function Movies({}) {
  return (
    <div className="Movies">
      <SearchForm />
      <Preloader />
      <MoviesCardList />
      {/* <Preloader /> */}
    </div>
  );
}
