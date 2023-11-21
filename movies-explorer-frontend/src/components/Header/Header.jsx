import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import purpleAccount from "../../images/logo-account.svg";
import whiteAccount from "../../images/logo-account-white.svg";
import Navigation from "../Navigation/Navigation";
import {
  MAIN_PATHNAME,
  MOVIES_PATHNAME,
  PROFILE_PATHNAME,
  SAVED_MOVIES_PATHNAME,
  SIGNIN_PATHNAME,
  SIGNUP_PATHNAME,
} from "../../utils/constants";

export default function Header({ isLoggedIn }) {
  const { pathname } = useLocation();

  const [isOpened, setIsOpened] = useState(false);
  function handleMenuOpened() {
    setIsOpened(!isOpened);
  }

  let isHidden = true;

  switch (pathname) {
    case MAIN_PATHNAME:
    case MOVIES_PATHNAME:
    case SAVED_MOVIES_PATHNAME:
    case PROFILE_PATHNAME:
      isHidden = false;
      break;

    default:
      isHidden = true;
  }

  function renderNonAuthorizedHeader() {
    return (
      <header
        className={`header ${isHidden ? "header_display_none" : ""} ${
          pathname === MAIN_PATHNAME ? "header_theme_purple" : ""
        }`}
      >
        <Link to={MAIN_PATHNAME} className="logo">
          <img src={logo} alt="логотип" />
        </Link>

        <nav className="header__navigation-noauth">
          <Link to={SIGNUP_PATHNAME} className="header__signup">
            Регистрация
          </Link>
          <Link to={SIGNIN_PATHNAME} className="header__signin">
            Войти
          </Link>
        </nav>
      </header>
    );
  }

  function renderAuthorizedHeader() {
    return (
      <header
        className={`header ${isHidden ? "header_display_none" : ""} ${
          pathname === MAIN_PATHNAME ? "header_theme_purple" : ""
        }`}
      >
        <Link to={MAIN_PATHNAME}>
          <img src={logo} className="logo" alt="логотип" />
        </Link>
        <button
          className={`header__burger-menu ${
            isOpened ? "header__burger-menu_active" : ""
          }`}
          type="button"
          onClick={handleMenuOpened}
        >
          <span></span>
        </button>
        <Navigation isOpened={isOpened} handleMenuOpened={handleMenuOpened} />

        <nav className="header__navigation">
          <div className="header__container-films">
            <Link
              to={MOVIES_PATHNAME}
              className={`header__link ${
                pathname === MOVIES_PATHNAME ? "header__link_active" : ""
              }`}
            >
              Фильмы
            </Link>
            <Link
              to={SAVED_MOVIES_PATHNAME}
              className={`header__link ${
                pathname === SAVED_MOVIES_PATHNAME ? " header__link_active" : ""
              }`}
            >
              Сохранённые фильмы
            </Link>
          </div>
          <div className="header__container-account">
            <Link
              to={PROFILE_PATHNAME}
              className={`header__account ${
                pathname === MAIN_PATHNAME ? "" : "header__account_white"
              }`}
            >
              Аккаунт
            </Link>
          </div>
        </nav>
      </header>
    );
  }

  return isLoggedIn ? renderAuthorizedHeader() : renderNonAuthorizedHeader();
}
