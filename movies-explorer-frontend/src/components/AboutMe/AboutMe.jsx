import { Link } from 'react-router-dom';
import photo from '../../images/photo.svg'

export default function AboutMe({}) {
  return (
    <section className="about-me" id="student">
      <h2 className="title about-me__title">Студент</h2>
      <div className="about-me__flexcontainer">
        <div className="about-me__container">
          <h3 className="subtitle about-me__subtitle">Виталий</h3>
          <p className="about-me__description">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link to="https://github.com/KrisGurach" className="about-me__link">GitHub</Link>
        </div>
        <img src={photo} className="about-me__photo" alt="фото создателя страницы" />
      </div>
    </section>
  );
}
