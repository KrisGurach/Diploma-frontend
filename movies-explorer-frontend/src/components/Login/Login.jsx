import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Login({}) {
  return (
    <div className="login">
      <div className="login__flex-container">
        <img src={logo} className="login__logo" alt="логотип сайта" />
        <h1 className="login__title">Рады видеть!</h1>
      </div>
      <form className="login__form">
        <p className="login__input-text">E-mail</p>
        <input
          type="text"
          name="email"
          placeholder="email@mail.ru"
          className="login__input login__input_type_email"
          minLength={2}
          maxLength={40}
          required=""
          //   value={values.email || ""}
          //   onChange={handleChange}
        />
        <p className="login__input-text">Пароль</p>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="login__input login__input_type_password"
          minLength={2}
          maxLength={400}
          required=""
          //   value={values.password || ""}
          //   onChange={handleChange}
        />
        <button className="login__button">Войти</button>
      </form>
      <div className="login__container">
        <p className="login__text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__link">
          Регистрация
        </Link>
      </div>
    </div>
  );
}
