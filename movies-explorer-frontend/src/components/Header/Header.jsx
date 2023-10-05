import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import account from "../../images/logo-account.svg";
import whiteAccount from "../../images/logo-account-white.svg";
import Navigation from "../Navigation/Navigation";

export default function Header({}) {
  const [isOpened, setIsOpened] = useState(false);
  function openNavigation() {
    setIsOpened(!isOpened);
  }

  return (
    <header className="header header_white">
      <Link to="/">
        <img src={logo} className="logo" alt="логотип" />
      </Link>
      <button
        className={`header__burger-menu ${isOpened && "open-menu"}`}
        type="button"
        onClick={openNavigation}
      >
        <span></span>
      </button>

      <Navigation isOpened={isOpened} />
      <div className="header__navigation">
        <div className="header__container-films">
          <Link to="/movies" className="header__films">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="header__films">
            Сохранённые фильмы
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
    </header>
  );
}
