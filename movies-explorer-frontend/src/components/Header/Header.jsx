import logo from "../../images/logo.svg";
import account from "../../images/logo-account.svg";

export default function Header({}) {
  return (
    <header className="header header_white">
      <img src={logo} className="logo" alt="логотип" />
      <div className="header__container">
        <div className="header__container-films">
          <p className="header__films">Фильмы</p>
          <p className="header__films">Сохранённые фильмы</p>
        </div>
        <div className="header__container-account">
          <p className="header__account">Аккаунт</p>
          <img className="header__logo-account" src={account} alt="логотип аккаунта" />
        </div>
      </div>
    </header>
  );
}
