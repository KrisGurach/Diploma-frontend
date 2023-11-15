import { Link } from "react-router-dom";
import cursor from "../../images/cursor.svg";

export default function Portfolio({}) {
  return (
    <section className="portfolio">
      <h2 className="portfolio__text">Портфолио</h2>
      <div className="portfolio__container">
        <Link
          to="https://github.com/KrisGurach/how-to-learn"
          className="portfolio__link"
        >
          Статичный сайт
        </Link>
        <img
          src={cursor}
          className="portfolio__image"
          alt="стрелка перехода на другой сайт"
        />
      </div>
      <div className="portfolio__container">
        <Link
          to="https://github.com/KrisGurach/russian-travel"
          className="portfolio__link"
        >
          Адаптивный сайт
        </Link>
        <img
          src={cursor}
          className="portfolio__image"
          alt="стрелка перехода на другой сайт"
        />
      </div>
      <div className="portfolio__container">
        <Link
          to="https://github.com/KrisGurach/react-mesto-api-full-gha"
          className="portfolio__link portfolio__last"
        >
          Одностраничное приложение
        </Link>
        <img
          src={cursor}
          className="portfolio__image"
          alt="стрелка перехода на другой сайт"
        />
      </div>
    </section>
  );
}
