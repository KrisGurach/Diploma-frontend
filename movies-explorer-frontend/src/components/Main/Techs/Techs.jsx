export default function Techs({}) {
  return (
    <div className="techs">
      <h2 className="title techs__title">Технологии</h2>
      <div className="techs__flex-container">
        <p className="techs__subtitle">7 технологий</p>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__lang">HTML</li>
          <li className="techs__lang">CSS</li>
          <li className="techs__lang">JS</li>
          <li className="techs__lang">React</li>
          <li className="techs__lang">Git</li>
          <li className="techs__lang">Express.js</li>
          <li className="techs__lang">mongoDB</li>
        </ul>
      </div>
    </div>
  );
}
