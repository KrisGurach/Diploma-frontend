import logo from "../../images/logo.svg";
import account from "../../images/logo-account.svg";
import { Link } from "react-router-dom";

export default function Header({}) {
  return (
    <header className="header header_white">
      <Link to="/">
        <img src={logo} className="logo" alt="логотип" />
      </Link>
      <div className="header__container">
        <div className="header__container-films">
          <Link to="/movies" className="header__films">Фильмы</Link>
          <Link to="/saved-movies" className="header__films">Сохранённые фильмы</Link>
        </div>
        <div className="header__container-account">
          <Link to="/profile" className="header__account">Аккаунт</Link>
          <img
            className="header__logo-account"
            src={account}
            alt="логотип аккаунта"
          />
        </div>
      </div>
    </header>
  );
}
