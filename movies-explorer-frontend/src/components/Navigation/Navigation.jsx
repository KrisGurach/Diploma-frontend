import { Link, useLocation } from "react-router-dom";
import whiteAccount from "../../images/logo-account-white.svg";

export default function Navigation({ isOpened, handleMenuOpened }) {
  const { pathname } = useLocation();

  return (
    <nav className={`navigation ${isOpened && "navigation_opened"}`}>
      <div className="navigation__menu-container">
        <div className="navigation__container">
          <Link
            to="/"
            className={`navigation__link ${
              pathname === "/" && "navigation__link_active"
            }`}
            onClick={handleMenuOpened}
          >
            Главная
          </Link>
          <Link
            to="/movies"
            className={`navigation__link ${
              pathname === "/movies" && "navigation__link_active"
            }`}
            onClick={handleMenuOpened}
          >
            Фильмы
          </Link>
          <Link
            to="/saved-movies"
            className={`navigation__link ${
              pathname === "/saved-movies" && "navigation__link_active"
            }`}
            onClick={handleMenuOpened}
          >
            Сохраненные фильмы
          </Link>
        </div>
        <div className="header__container-account">
          <Link to="/profile" className="header__account"
            onClick={handleMenuOpened}
            >
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
    </nav>
  );
}
