export default function Footer({}) {
  return (
    <div className="footer">
      <p className="footer__text footer__text_grey">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__flex-container">
        <p className="footer__text footer__text_black">© 2023</p>
        <div className="footer__container">
          <p className="footer__text footer__text_black">Яндекс.Практикум</p>
          <p className="footer__text footer__text_black">Github</p>
        </div>  
      </div>
    </div>
  );
}
