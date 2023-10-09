import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { signInPathname } from "../../utils/constants";

export default function Register({}) {
    return (
        <section className="register">
        <div className="form__flex-container">
          <img src={logo} className="salut-logo" alt="логотип сайта" />
          <p className="salut-title">Добро пожаловать!</p>
        </div>
        <form className="form__form">
        <p className="form__input-text">Имя</p>
          <input
            type="text"
            name="Имя"
            placeholder="Имя"
            className="register__input register__input_type_name"
            required=""
          />  
          {/* <span className="input__error /> */}
          <p className="form__input-text">E-mail</p>
          <input
            type="text"
            name="email"
            placeholder="email@mail.ru"
            className="register__input register__input_type_email"
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
            className="register__input register__input_type_password"
            minLength={2}
            maxLength={40}
            required=""
          />
          {/* <span className="popup__error popup__error_type_avatar" /> */}
          <button className="form__save-button">Зарегистрироваться</button>
        </form>
        <div className="form__container">
          <p className="form__text">Уже зарегистрированы?</p>
          <Link to={signInPathname} className="form__link">
            Войти
          </Link>
        </div>
      </section>
    )}