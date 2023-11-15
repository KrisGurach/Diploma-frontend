import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import { signUpPathname } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useInputParameters } from "../../hooks/useInputParameters";
import auth from "../../utils/Api/AuthApi";
import { useForm } from "../../hooks/useForm";
import checkUserDataInputs from "../../utils/userDataHelper";

export default function Login({ handleLogin, handleUpdateUser }) {
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
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  // server error handling
  const [hasServerError, setHasServerError] = useState(false);

  // submit button handling
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  useEffect(() => {
    const hasInvalidInput = checkUserDataInputs(inputParameters, values);
    setIsSubmitButtonDisabled(hasInvalidInput);
  }, [inputParameters, values]);

  const handleInputChange = (event) => {
    setHasServerError(false);

    handleChange(event);
    validateInput(event);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .signIn(values.email, values.password)
      .then((data) => {
        if (data.token) {
          setValues({ email: "", password: "" });
          handleLogin();
          navigate("/movies", { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
        setHasServerError(true);
      });
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
            required=""
            value={values.email || ""}
            onChange={handleInputChange}
          />
          <div className="form__error-container">
            {inputParameters.find((input) => input.inputName === "email")
              .isInvalid && (
              <span className="form__error ">Что-то пошло не так...</span>
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
          <div className="form__server-error-container">
            {hasServerError && (
              <span className="form__server-error">
                Вы ввели неправильный логин или пароль.
              </span>
            )}
          </div>
          <button
            className="form__save-button form__save-button_type_login"
            type="submit"
            disabled={isSubmitButtonDisabled}
          >
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
