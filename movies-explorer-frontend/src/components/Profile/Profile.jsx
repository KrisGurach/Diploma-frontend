import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInPathname } from "../../utils/constants";
import { useForm } from "../../hooks/useForm";
import { useInputParameters } from "../../hooks/useInputParameters";
import checkUserDataInputs from "../../utils/userDataHelper";
import mainApi from "../../utils/Api/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({ onUpdateUser, handleSignOut }) {
  const navigate = useNavigate();

  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange } = useForm(currentUser);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [hasServerError, setHasServerError] = useState(false);

  const enableInput = (e) => {
    e.preventDefault();
    setInputDisabled(false);
  };

  const handleSignOutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lastSearch");
    handleSignOut();
    navigate(signInPathname, { replace: true });
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setHasServerError(false);

    mainApi
      .updateUser(values)
      .then(() => {
        setInputDisabled(true);
        onUpdateUser(values);
      })
      .catch((error) => {
        console.error(error);
        setHasServerError(true);
      });
  };

  // input validation handling
  const inputClassNames = {
    baseInputName: "profile__input",
    inputTypeName: "profile__input_type_",
    invalidInputName: "profile__input_invalid",
  };

  const { inputParameters, validateInput } = useInputParameters(
    ["email", "name"],
    inputClassNames
  );

  // submit button handling
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  useEffect(() => {
    const hasInvalidInput = checkUserDataInputs(inputParameters, values);

    const hasSameValues =
      values.name === currentUser.name && values.email === currentUser.email;

    setIsSubmitButtonDisabled(hasInvalidInput || hasSameValues);
  }, [inputParameters, values]);

  const handleInputChange = (event) => {
    setHasServerError(false);

    handleChange(event);
    validateInput(event);
  };

  return (
    <main>
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form
          className="profile__form"
          name="form-of-profile"
          onSubmit={handleSaveClick}
          noValidate
        >
          <div className="profile__container">
            <p className="profile__input-text">Имя</p>
            <input
              type="text"
              name="name"
              placeholder="Имя"
              className={
                inputParameters.find((input) => input.inputName === "name")
                  .className
              }
              required
              disabled={inputDisabled}
              value={values.name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="profile__container">
            <p className="profile__input-text">E-mail</p>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className={
                inputParameters.find((input) => input.inputName === "email")
                  .className
              }
              required
              disabled={inputDisabled}
              value={values.email || ""}
              onChange={handleInputChange}
            />
          </div>
          {inputDisabled && (
            <button className="profile__change-button" onClick={enableInput}>
              Редактировать
            </button>
          )}
          {hasServerError && (
            <span className="profile__error-message">
              При обновлении профиля произошла ошибка.
            </span>
          )}
          {!inputDisabled && (
            <button
              className="profile__save-button"
              type="submit"
              disabled={isSubmitButtonDisabled}
            >
              Сохранить
            </button>
          )}
        </form>
        {inputDisabled && (
          <button
            className="profile__go-out-button"
            onClick={handleSignOutClick}
          >
            Выйти из аккаунта
          </button>
        )}
      </section>
    </main>
  );
}
