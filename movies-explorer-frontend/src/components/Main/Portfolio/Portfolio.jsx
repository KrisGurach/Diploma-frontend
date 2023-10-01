import cursor from "../../../images/cursor.svg"

export default function Portfolio({}) {
  return (
    <div className="portfolio">
      <p className="portfolio__text">Портфолио</p>
      <div className="portfolio__container">
        <p className="portfolio__link">Статичный сайт</p>
        <img src={cursor} className="portfolio__image" alt="стрелка перехода на другой сайт" />
      </div>
      <div className="portfolio__container">
        <p className="portfolio__link">Адаптивный сайт</p>
        <img src={cursor} className="portfolio__image" alt="стрелка перехода на другой сайт" />
      </div>
      <div className="portfolio__container">
        <p className="portfolio__link portfolio__last">Одностраничное приложение</p>
        <img src={cursor} className="portfolio__image" alt="стрелка перехода на другой сайт" />
      </div>
    </div>
  );
}
