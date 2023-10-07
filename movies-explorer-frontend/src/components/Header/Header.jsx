import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import purpleAccount from "../../images/logo-account.svg";
import whiteAccount from "../../images/logo-account-white.svg";
import Navigation from "../Navigation/Navigation";

export default function Header({isLoggedIn}) {
  const { pathname } = useLocation();

  const [isOpened, setIsOpened] = useState(false);
  function handleMenuOpened() {
    setIsOpened(!isOpened);
  };

  let isHidden = true;

  switch (pathname) {
    case "/":
    case "/movies":
    case "/saved-movies":
    case "/profile":    
      isHidden = false;
      break;

    default:
      isHidden = true;  
  };

  function renderNonAuthorizedHeader() {
    return (
      <header className={`header ${isHidden && "header_display_none"} ${pathname ===  "/" && "header_theme_purple"}`}>
        <Link to="/" className="logo" >
        <img src={logo} alt="логотип" />
      </Link>

      <nav className="header__navigation-noauth">
        <Link to="/signup" className="header__signup">Регистрация</Link>
        <Link to="/signin" className="header__signin">Войти</Link>
      </nav>
      </header>
    )
  }

  function renderAuthorizedHeader() {
    return (
      <header className={`header ${isHidden && "header_display_none"} ${pathname ===  "/" && "header_theme_purple"}`}>
      <Link to="/">
        <img src={logo} className="logo" alt="логотип" />
      </Link>
      <button
        className={`header__burger-menu ${isOpened && "open-menu"}`}
        type="button"
        onClick={handleMenuOpened}
      >
        <span></span>
      </button>
      <Navigation isOpened={isOpened} handleMenuOpened={handleMenuOpened}/>

      <nav className="header__navigation">
        <div className="header__container-films">
          <Link to="/movies" className={`header__link ${pathname ===  "/movies" && "header__link_active"}`}>
            Фильмы
          </Link>
          <Link to="/saved-movies" className={`header__link ${pathname ===  "/saved-movies" && " header__link_active"}`}>
            Сохранённые фильмы
          </Link>
        </div>
        <div className="header__container-account">
          <Link to="/profile" className="header__account">
            Аккаунт
          </Link>
          <img
            className="header__logo-account"
            src={pathname ===  "/" ? purpleAccount : whiteAccount}
            alt="логотип аккаунта"
          />
        </div>
      </nav>
    </header>
    )
  }

  return (
    isLoggedIn ? renderAuthorizedHeader() : renderNonAuthorizedHeader()
  );
}
