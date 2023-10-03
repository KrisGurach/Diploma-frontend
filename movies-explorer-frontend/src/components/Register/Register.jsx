import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Register({}) {
    return (
        <div className="register">
        <div className="flex-container">
          <img src={logo} className="salut-logo" alt="логотип сайта" />
          <p className="salut-title">Добро пожаловать!</p>
        </div>
        <form className="form">
        <p className="input-text">Имя</p>
          <input
            type="text"
            name="Имя"
            placeholder="Имя"
            className="input register__input_type_name"
            // minLength={2}
            // maxLength={40}
            required=""
            //   value={values.email || ""}
            //   onChange={handleChange}
          />  
          <p className="input-text">E-mail</p>
          <input
            type="text"
            name="email"
            placeholder="email@mail.ru"
            className="input register__input_type_email"
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
            className="input register__input_type_password"
            minLength={2}
            maxLength={400}
            required=""
            //   value={values.password || ""}
            //   onChange={handleChange}
          />
          <button className="save-button">Зарегистрироваться</button>
        </form>
        <div className="container">
          <p className="text">Уже зарегистрированы?</p>
          <Link to="/signin" className="link">
            Войти
          </Link>
        </div>
      </div>
    )}