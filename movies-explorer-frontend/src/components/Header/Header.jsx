import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import purpleAccount from "../../images/logo-account.svg";
import whiteAccount from "../../images/logo-account-white.svg";
import Navigation from "../Navigation/Navigation";
import {
  mainPathname,
  moviesPathname,
  profilePathname,
  savedMoviesPathname,
  signInPathname,
  signUpPathname,
} from "../../utils/constants";

export default function Header({isLoggedIn}) {
  const { pathname } = useLocation();

  const [isOpened, setIsOpened] = useState(false);
  function handleMenuOpened() {
    setIsOpened(!isOpened);
  };

  let isHidden = true;

  switch (pathname) {
    case mainPathname:
    case moviesPathname:
    case savedMoviesPathname:
    case profilePathname:    
      isHidden = false;
      break;

    default:
      isHidden = true;  
  };

  function renderNonAuthorizedHeader() {
    return (
      <header className={`header ${isHidden && "header_display_none"} ${pathname ===  mainPathname && "header_theme_purple"}`}>
        <Link to={mainPathname} className="logo" >
        <img src={logo} alt="логотип" />
      </Link>

      <nav className="header__navigation-noauth">
        <Link to={signUpPathname} className="header__signup">Регистрация</Link>
        <Link to={signInPathname} className="header__signin">Войти</Link>
      </nav>
      </header>
    )
  }

  function renderAuthorizedHeader() {
    return (
      <header className={`header ${isHidden && "header_display_none"} ${pathname ===  mainPathname && "header_theme_purple"}`}>
      <Link to={mainPathname}>
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
          <Link to={moviesPathname} className={`header__link ${pathname ===  moviesPathname && "header__link_active"}`}>
            Фильмы
          </Link>
          <Link to={savedMoviesPathname} className={`header__link ${pathname ===  savedMoviesPathname && " header__link_active"}`}>
            Сохранённые фильмы
          </Link>
        </div>
        <div className="header__container-account">
          <Link to={profilePathname} className={pathname ===  mainPathname ? "header__account" : " header__account_white"}>
            Аккаунт
          </Link>
          {/* <img
            className="header__logo-account"
            src={pathname ===  mainPathname ? purpleAccount : whiteAccount}
            alt="логотип аккаунта"
          /> */}
        </div>
      </nav>
    </header>
    )
  }

  return (
    isLoggedIn ? renderAuthorizedHeader() : renderNonAuthorizedHeader()
  );
}
