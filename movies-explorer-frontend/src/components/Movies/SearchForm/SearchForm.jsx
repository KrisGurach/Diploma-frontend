import icon from "../../../images/search-icon.svg";

export default function SearchForm({}) {
  return (
    <div className="searchForm">
        <form className="searchForm__form">
          <div className="searchForm__container">
            <img src={icon} className="searchForm__icon" alt="поиск фильма" />
            <input  
              type="text"
              name="Фильм"
              placeholder="Фильм" 
              className="searchForm__input searchForm__input_film" 
            />
          </div>
          <div className="searchForm__container">
            <div className="seachForm__container-button">
              <button className="searchForm__search-button">Найти</button>
            </div>
            <button className="searchForm__button searchForm__button_active"></button>
            <p className="searchForm__checkbox-text">Короткометражки</p>
          </div>
        </form>
    </div>
  );
}
