import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { signUpPathname } from "../../utils/constants";

export default function Login({}) {
  return (
    <section className="login">
      <div className="form__flex-container">
        <img src={logo} className="salut-logo" alt="логотип сайта" />
        <p className="salut-title">Рады видеть!</p>
      </div>
      <form className="form__form">
        <p className="form__input-text">E-mail</p>
        <input
          type="text"
          name="email"
          placeholder="email@mail.ru"
          className="login__input login__input_type_email"
          minLength={2}
          maxLength={40}
          required=""
        />
        {/* <span className="input__error /> */}
        <p className="form__input-text">Пароль</p>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="login__input login__input_type_password"
          minLength={2}
          maxLength={40}
          required=""
        />
        {/* <span className="input__error /> */}
        <button className="form__save-button">Войти</button>
      </form>
      <div className="form__container">
        <p className="form__text">Ещё не зарегистрированы?</p>
        <Link to={signUpPathname} className="form__link">
          Регистрация
        </Link>
      </div>
    </section>
  );
}
