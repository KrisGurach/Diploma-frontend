import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Login({}) {
  return (
    <div className="login">
      <div className="flex-container">
        <img src={logo} className="salut-logo" alt="логотип сайта" />
        <p className="salut-title">Рады видеть!</p>
      </div>
      <form className="form">
        <p className="input-text">E-mail</p>
        <input
          type="text"
          name="email"
          placeholder="email@mail.ru"
          className="input login__input_type_email"
          minLength={2}
          maxLength={40}
          required=""
          //   value={values.email || ""}
          //   onChange={handleChange}
        />
        <p className="input-text">Пароль</p>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="input login__input_type_password"
          minLength={2}
          maxLength={400}
          required=""
          //   value={values.password || ""}
          //   onChange={handleChange}
        />
        <button className="save-button">Войти</button>
      </form>
      <div className="container">
        <p className="text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="link">
          Регистрация
        </Link>
      </div>
    </div>
  );
}
