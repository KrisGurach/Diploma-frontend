import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { signInPathname } from "../../utils/constants";
import { useState } from "react";
import { useInputParameters } from "../../hooks/useInputParameters";

export default function Register({}) {
  const inputClassNames = {
    baseInputName: "register__input",
    inputTypeName: "register__input_type_",
    invalidInputName: "register__input_invalid",
  };

  const { inputParameters, handleInputChange } = useInputParameters(
    ["name", "email", "password"],
    inputClassNames
  );

  // error handling
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasError(inputParameters.some((input) => input.isInvalid));
  };

  return (
    <main>
      <section className="register form">
        <div className="form__flex-container">
          <img
            src={logo}
            className="logo logo_type_greeting"
            alt="логотип сайта"
          />
          <h1 className="salut-title">Добро пожаловать!</h1>
        </div>
        <form
          className="form__form"
          name="form-of-register"
          onSubmit={handleSubmit}
          noValidate
        >
          <p className="form__input-text">Имя</p>
          <input
            type="text"
            name="name"
            placeholder="Имя"
            className={
              inputParameters.find((input) => input.inputName === "name")
                .className
            }
            required=""
            onChange={handleInputChange}
          />
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
          <button className="form__save-button form__save-button_type_register" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="form__container">
          <p className="form__text">Уже зарегистрированы?</p>
          <Link to={signInPathname} className="form__link">
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
}
