import { useLocation } from "react-router-dom";

export default function Footer({}) {
  const { pathname } = useLocation();

  let isHidden = true;

  switch (pathname) {
    case "/":
    case "/movies":
    case "/saved-movies":
      isHidden = false;
      break;

    default:
      isHidden = true;  
  };

  return (
    <div className={`"footer" ${isHidden && "footer_display_none"}`}>
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
