import photo from '../../../images/photo.svg'

export default function AboutMe({}) {
  return (
    <section className="aboutMe" id="student">
      <h2 className="title aboutMe__title">Студент</h2>
      <div className="aboutMe__flexcontainer">
        <div className="aboutMe__container">
          <p className="subtitle aboutMe__subtitle">Виталий</p>
          <p className="aboutMe__description">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutMe__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <p className="aboutMe__link">GitHub</p>
        </div>
        <img src={photo} className="aboutMe__photo" alt="фото создателя страницы" />
      </div>
    </section>
  );
}
