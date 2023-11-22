export default function AboutProject({}) {
  return (
    <section className="project" id="aboutProject">
      <h2 className="title project__title">О проекте</h2>
      <div className="project__flex-container">
        <div className="project__container">
          <p className="project__subtitle">Дипломный проект включал 5 этапов</p>
          <p className="project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="project__container">
          <p className="project__subtitle">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="project__time">
        <p className="project__box project__box_height_l project__box_size_s project__box_color_black">
          1 неделя
        </p>
        <p className="project__box project__box_height_l project__box_size_l project__box_color_grey">
          4 недели
        </p>
      </div>
      <div className="project__time">
        <p className="project__box project__box_height_s project__box_size_s project__box_white">
          Back-end
        </p>
        <p className="project__box project__box_height_s project__box_size_l project__box_white">
          Front-end
        </p>
      </div>
    </section>
  );
}
