import icon from "../../../images/search-icon.svg";

export default function SearchForm({}) {
  return (
    <section className="searchForm">
      <form className="searchForm__form">
        <div className="searchForm__container">
          <img src={icon} className="searchForm__icon" alt="поиск фильма" />
          <input
            type="text"
            name="film"
            placeholder="Фильм"
            className="searchForm__input searchForm__input_film"
          />
        </div>
        <div className="searchForm__container">
          <div className="seachForm__container-button">
            <button className="searchForm__search-button">Найти</button>
          </div>
          <div className="searchForm__container_size_l">
            <label class="searchForm__toggle-button">
              <input type="checkbox"></input>
              <span class="searchForm__toggle-button-switch"></span>
              Короткометражки
            </label>
          </div>
        </div>
      </form>
      <div className="searchForm__container_size_s">
        <label class="searchForm__toggle-button">
          <input type="checkbox"></input>
          <span class="searchForm__toggle-button-switch"></span>
          Короткометражки
        </label>
      </div>
    </section>
  );
}
