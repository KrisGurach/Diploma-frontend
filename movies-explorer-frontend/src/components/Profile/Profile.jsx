export default function Profile({}) {
  return (
    <div className="profile">
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
            maxLength={400}
            required=""
          />
        </div>
        <button className="profile__change-button">Редактировать</button>
      </form>
      <button className="profile__go-out-button">Выйти из аккаунта</button>
    </div>
  );
}
