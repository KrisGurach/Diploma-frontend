import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInPathname } from "../../utils/constants";

export default function Profile({handleSignOut}) {
  const navigate = useNavigate();

  const [inputDisabled, setInputDisabled] = useState(true);
  
  const enableInput = (e) => {
    e.preventDefault();
    setInputDisabled(false)
  };

  const handleSignOutClick =() => {
    handleSignOut();
    navigate(signInPathname, { replace: true })
  }

  return (
    <section className="profile">
      <p className="profile__title">Привет, username!</p>
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
            required=""
            disabled={inputDisabled}
          />
        </div>
        <div className="profile__container">
          <p className="profile__input-text">E-mail</p>
          <input
            type="text"
            name="e-mail"
            placeholder="E-mail"
            className="profile__input profile__input_type_email"
            minLength={2}
            maxLength={40}
            required=""
            disabled={inputDisabled}
          />
        </div>
        <button className="profile__change-button" onClick={enableInput}>Редактировать</button>
      </form>
      <button className="profile__go-out-button" onClick={handleSignOutClick}>Выйти из аккаунта</button>
    </section>
  );
}
