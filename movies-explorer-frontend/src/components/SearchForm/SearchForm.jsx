import { useCheckbox } from "../../hooks/useCheckbox";
import { useForm } from "../../hooks/useForm";
import icon from "../../images/search-icon.svg";

export default function SearchForm({
  onSearchClick,
  searchData,
  isShortOnlyChange,
}) {
  const { values, handleChange } = useForm({ searchText: searchData.query });
  const { checkboxValues, handleCheckboxChange } = useCheckbox({
    shortFilms: searchData.isShortOnly,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const query = values.searchText;

    if (!query) {
      alert("Нужно ввести ключевое слово.");
      return;
    }

    onSearchClick(query);
  };

  const handleSortButtonChange = (e) => {
    handleCheckboxChange(e);

    isShortOnlyChange(e.target.checked);
  };

  return (
    <section className="search-form">
      <form
        className="search-form__form"
        name="form-of-search"
        onSubmit={handleSubmit}
      >
        <div className="search-form__container">
          <img src={icon} className="search-form__icon" alt="поиск фильма" />
          <input
            type="text"
            name="searchText"
            placeholder="Фильм"
            className="search-form__input search-form__input_film"
            defaultValue={values.searchText || ""}
            onChange={handleChange}
          />
        </div>
        <div className="search-form__container">
          <div className="search-form__container-button">
            <button className="search-form__search-button" type="submit">
              Найти
            </button>
          </div>
          <div className="search-form__box search-form__box_size_l">
            <label className="search-form__toggle-button">
              <input
                type="checkbox"
                name="shortFilms"
                checked={checkboxValues.shortFilms || false}
                onChange={handleSortButtonChange}
              ></input>
              <span className="search-form__toggle-button-switch"></span>
              Короткометражки
            </label>
          </div>
        </div>
      </form>
      <div className="search-form__box search-form__box_size_s">
        <label className="search-form__toggle-button">
          <input
            type="checkbox"
            name="shortFilms"
            checked={checkboxValues.shortFilms || false}
            onChange={handleSortButtonChange}
          ></input>
          <span className="search-form__toggle-button-switch"></span>
          Короткометражки
        </label>
      </div>
    </section>
  );
}
