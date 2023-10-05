import { Link } from "react-router-dom";
import whiteAccount from "../../images/logo-account-white.svg";

export default function Navigation({ isOpened }) {
  return (
    <div className={`navigation ${isOpened && "navigation_opened"}`}>
        <div className="navigation__menu-container">
          <div className="container">
            <Link to="/" className="navigation__link">
              Главная
            </Link>
            <Link to="/movies"className="navigation__link">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="navigation__link">
              Сохраненные фильмы
            </Link>
          </div>
          <div className="header__container-account">
          <Link to="/profile" className="header__account">
            Аккаунт
          </Link>
          <img
            className="header__logo-account"
            src={whiteAccount}
            alt="логотип аккаунта"
          />
        </div>
        </div>
        <div className="navigation__overlay"></div>
    </div>
  );
}
