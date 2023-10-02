import logo from "../../images/logo.svg";

export default function Login({}) {
  return (
    <div className="login">
      <img src={logo} className="login__logo" alt="логотип сайта" />
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          className="login__input login__input_type_email"
          minLength={2}
          maxLength={40}
          required=""
        //   value={values.email || ""}
        //   onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="signIn__input signIn__input_type_password"
          minLength={2}
          maxLength={400}
          required=""
        //   value={values.password || ""}
        //   onChange={handleChange}
        />
        <button className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
}
