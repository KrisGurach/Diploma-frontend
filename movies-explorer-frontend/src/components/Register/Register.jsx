import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import { signInPathname } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useInputParameters } from "../../hooks/useInputParameters";
import checkUserDataInputs from "../../utils/userDataHelper";
import { useForm } from "../../hooks/useForm";
import auth from "../../utils/Api/AuthApi";

export default function Register({ handleLogin }) {
  const navigate = useNavigate();

  const inputClassNames = {
    baseInputName: "register__input",
    inputTypeName: "register__input_type_",
    invalidInputName: "register__input_invalid",
  };

  const { inputParameters, validateInput } = useInputParameters(
    ["name", "email", "password"],
    inputClassNames
  );

  // input values handling
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setHasServerError(false);

    handleChange(event);
    validateInput(event);
  };

  // server error handling
  const [hasServerError, setHasServerError] = useState(false);

  // submit button handling
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  useEffect(() => {
    const hasInvalidInput = checkUserDataInputs(inputParameters, values);
    setIsSubmitButtonDisabled(hasInvalidInput);
  }, [inputParameters, values]);

  const [errorMessage, setErrorMessage] = useState(
    "При регистрации пользователя произошла ошибка."
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .signUp(values)
      .then(() => {
        auth
          .signIn(values.email, values.password)
          .then((data) => {
            if (data.token) {
              setValues({ name: "", email: "", password: "" });
              handleLogin();
              navigate("/movies", { replace: true });
            }
          })
          .catch((error) => {
            console.error(error);
            setHasServerError(true);
          });
      })
      .catch((errorCode) => {
        if (errorCode === 409) {
          setErrorMessage("Пользователь с таким email уже существует.");
        }

        console.error(`Ошибка: ${errorCode}`);

        setHasServerError(true);
      });
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
            value={values.name || ""}
            onChange={handleInputChange}
          />
          <div className="form__error-container">
            {inputParameters.find((input) => input.inputName === "name")
              .isInvalid && (
              <span className="form__error">Что-то пошло не так...</span>
            )}
          </div>
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
            value={values.email || ""}
            onChange={handleInputChange}
          />
          <div className="form__error-container">
            {inputParameters.find((input) => input.inputName === "email")
              .isInvalid && (
              <span className="form__error">Что-то пошло не так...</span>
            )}
          </div>
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
            value={values.password || ""}
            onChange={handleInputChange}
          />
          <div className="form__error-container">
            {inputParameters.find((input) => input.inputName === "password")
              .isInvalid && (
              <span className="form__error">Что-то пошло не так...</span>
            )}
          </div>
          <div className="form__server-error-container form__server-error-container_type_register">
            {hasServerError && (
              <span className="form__server-error">{errorMessage}</span>
            )}
          </div>
          <button
            className="form__save-button form__save-button_type_register"
            type="submit"
            disabled={isSubmitButtonDisabled}
          >
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
