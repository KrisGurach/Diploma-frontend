import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import { signUpPathname } from "../../utils/constants";
import { useState } from "react";
import { useInputParameters } from "../../hooks/useInputParameters";
import auth from "../../utils/Api/AuthApi";
import { useForm } from "../../hooks/useForm";

export default function Login({handleLogin}) {
  const navigate = useNavigate();

  // input validation handling
  const inputClassNames = {
    baseInputName: "login__input",
    inputTypeName: "login__input_type_",
    invalidInputName: "login__input_invalid",
  };

  const { inputParameters, validateInput } = useInputParameters(
    ["email", "password"],
    inputClassNames
  );

  // input values handling
  const { values, handleChange, setValues } = useForm();

  // error handling
  const [hasError, setHasError] = useState(false);

  const handleInputChange = (event) => {
    handleChange(event);
    validateInput(event);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasError(inputParameters.some((input) => input.isInvalid));

    if (hasError) {
      return;
    }

    auth
    .signIn(values.email, values.password)
    .then((data) => {
      if (data.token) {
        setValues({ email: "", password: "" });
        handleLogin();
        navigate("/movies", { replace: true });
      }
    })
    .catch(console.error);
  };

  return (
    <main>
      <section className="login form">
        <div className="form__flex-container">
          <img
            src={logo}
            className="logo logo_type_greeting"
            alt="логотип сайта"
          />
          <h1 className="salut-title">Рады видеть!</h1>
        </div>
        <form
          className="form__form"
          name="form-of-login"
          onSubmit={handleSubmit}
          noValidate
        >
          <p className="form__input-text">E-mail</p>
          <input
            type="text"
            name="email"
            placeholder="email@mail.ru"
            className={
              inputParameters.find((input) => input.inputName === "email")
                .className
            }
            minLength={2}
            maxLength={40}
            required=""
            onChange={handleInputChange}
          />
          <p className="form__input-text">Пароль</p>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className={
              inputParameters.find((input) => input.inputName === "password")
                .className
            }
            minLength={2}
            maxLength={40}
            required=""
            onChange={handleInputChange}
          />
          <div className="form__error-container">
            {hasError && (
              <span className="form__error">Что-то пошло не так...</span>
            )}
          </div>
          <button className="form__save-button form__save-button_type_login" type="submit">
            Войти
          </button>
        </form>
        <div className="form__container">
          <p className="form__text">Ещё не зарегистрированы?</p>
          <Link to={signUpPathname} className="form__link">
            Регистрация
          </Link>
        </div>
      </section>
    </main>
  );
}
