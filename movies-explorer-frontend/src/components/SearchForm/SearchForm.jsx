import icon from "../../images/search-icon.svg";

export default function SearchForm({}) {
  return (
    <section className="search-form">
      <form className="search-form__form" name="form-of-search">
        <div className="search-form__container">
          <img src={icon} className="search-form__icon" alt="поиск фильма" />
          <input
            type="text"
            name="film"
            placeholder="Фильм"
            className="search-form__input search-form__input_film"
          />
        </div>
        <div className="search-form__container">
          <div className="search-form__container-button">
            <button className="search-form__search-button">Найти</button>
          </div>
          <div className="search-form__box search-form__box_size_l">
            <label className="search-form__toggle-button">
              <input type="checkbox"></input>
              <span className="search-form__toggle-button-switch"></span>
              Короткометражки
            </label>
          </div>
        </div>
      </form>
      <div className="search-form__box search-form__box_size_s">
        <label className="search-form__toggle-button">
          <input type="checkbox"></input>
          <span className="search-form__toggle-button-switch"></span>
          Короткометражки
        </label>
      </div>
    </section>
  );
}
