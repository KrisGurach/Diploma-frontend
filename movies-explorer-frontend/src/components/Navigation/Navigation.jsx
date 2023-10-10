import { Link, useLocation } from "react-router-dom";
import whiteAccount from "../../images/logo-account-white.svg";
import {
  mainPathname,
  moviesPathname,
  profilePathname,
  savedMoviesPathname,
} from "../../utils/constants";

export default function Navigation({ isOpened, handleMenuOpened }) {
  const { pathname } = useLocation();

  return (
    <main>
      <nav className={`navigation ${isOpened && "navigation_opened"}`}>
        <div className="navigation__menu-container">
          <div className="navigation__container">
            <Link
              to={mainPathname}
              className={`navigation__link ${
                pathname === mainPathname && "navigation__link_active"
              }`}
              onClick={handleMenuOpened}
            >
              Главная
            </Link>
            <Link
              to={moviesPathname}
              className={`navigation__link ${
                pathname === moviesPathname && "navigation__link_active"
              }`}
              onClick={handleMenuOpened}
            >
              Фильмы
            </Link>
            <Link
              to={savedMoviesPathname}
              className={`navigation__link ${
                pathname === savedMoviesPathname && "navigation__link_active"
              }`}
              onClick={handleMenuOpened}
            >
              Сохраненные фильмы
            </Link>
          </div>
          <div className="header__container-account">
            <Link
              to={profilePathname}
              className="header__account"
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
    </main>
  );
}
