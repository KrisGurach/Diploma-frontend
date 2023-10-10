import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInPathname } from "../../utils/constants";
import { useForm } from "../../hooks/useForm";

export default function Profile({ handleSignOut, currentUser, onUpdateUser }) {
  const navigate = useNavigate();

  const { values, handleChange, setValues } = useForm(currentUser);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  const enableInput = (e) => {
    e.preventDefault();
    setInputDisabled(false);
  };

  const handleSignOutClick = () => {
    handleSignOut();
    navigate(signInPathname, { replace: true });
  };

  const handleSaveClick = (e) => {
    e.preventDefault();

    if (true) {
      setHasError(true);
      return;
    }

    setInputDisabled(true);
    onUpdateUser(values);
  };

  return (
    <main>
      <section className="profile">
        <h1 className="profile__title">Привет, username!</h1>
        <form className="profile__form">
          <div className="profile__container">
            <p className="profile__input-text">Имя</p>
            <input
              type="text"
              name="name"
              placeholder="Имя"
              className="profile__input profile__input_type_email"
              minLength={2}
              maxLength={40}
              required
              disabled={inputDisabled}
              value={values.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="profile__container">
            <p className="profile__input-text">E-mail</p>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="profile__input profile__input_type_email"
              minLength={2}
              maxLength={40}
              required
              disabled={inputDisabled}
              value={values.email || ""}
              onChange={handleChange}
            />
          </div>
          {inputDisabled && (
            <button className="profile__change-button" onClick={enableInput}>
              Редактировать
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
        {hasError && <span className="profile__error-message">При обновлении профиля произошла ошибка.</span>}
        {!inputDisabled && (
          <button
            className="profile__save-button"
            disabled={hasError}
            onClick={handleSaveClick}
          >
            Сохранить
          </button>
        )}
      </section>
    </main>
  );
}
