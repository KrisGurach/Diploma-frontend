import { Link, useLocation } from "react-router-dom";
import whiteAccount from "../../images/logo-account-white.svg";
import {
  MAIN_PATHNAME,
  MOVIES_PATHNAME,
  PROFILE_PATHNAME,
  SAVED_MOVIES_PATHNAME,
} from "../../utils/constants";

export default function Navigation({ isOpened, handleMenuOpened }) {
  const { pathname } = useLocation();

  return (
    <main>
      <nav className={`navigation ${isOpened ? "navigation_opened" : ""}`}>
        <div className="navigation__menu-container">
          <div className="navigation__container">
            <Link
              to={MAIN_PATHNAME}
              className={`navigation__link ${
                pathname === MAIN_PATHNAME ? "navigation__link_active" : ""
              }`}
              onClick={handleMenuOpened}
            >
              Главная
            </Link>
            <Link
              to={MOVIES_PATHNAME}
              className={`navigation__link ${
                pathname === MOVIES_PATHNAME ? "navigation__link_active" : ""
              }`}
              onClick={handleMenuOpened}
            >
              Фильмы
            </Link>
            <Link
              to={SAVED_MOVIES_PATHNAME}
              className={`navigation__link ${
                pathname === SAVED_MOVIES_PATHNAME
                  ? "navigation__link_active"
                  : "  "
              }`}
              onClick={handleMenuOpened}
            >
              Сохраненные фильмы
            </Link>
          </div>
          <div className="header__container-account">
            <Link
              to={PROFILE_PATHNAME}
              className="header__account header__account_white"
              onClick={handleMenuOpened}
            >
              Аккаунт
            </Link>
          </div>
        </div>
        <div className="navigation__overlay"></div>
      </nav>
    </main>
  );
}
