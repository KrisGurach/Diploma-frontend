import icon from "../../../images/search-icon.svg";

export default function SearchForm({}) {
  return (
    <div className="searchForm">
      <div className="searchForm__search-field">
        <div className="searchForm__container">
          <img src={icon} className="searchForm__icon" alt="" />
          <p className="searchForm__text">Фильм</p>
        </div>
        <div className="searchForm__container">
          <div className="seachForm__container-button">
            <button className="searchForm__search-button">Найти</button>
          </div>
          <button className="searchForm__button searchForm__button_active"></button>
          <p className="searchForm__checkbox-text">Короткометражки</p>
        </div>
      </div>
    </div>
  );
}
