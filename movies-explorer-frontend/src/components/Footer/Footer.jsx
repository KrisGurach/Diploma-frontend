import { Link, useLocation } from "react-router-dom";
import {
  MAIN_PATHNAME,
  MOVIES_PATHNAME,
  SAVED_MOVIES_PATHNAME,
} from "../../utils/constants";

export default function Footer({}) {
  const { pathname } = useLocation();

  let isHidden = true;

  switch (pathname) {
    case MAIN_PATHNAME:
    case MOVIES_PATHNAME:
    case SAVED_MOVIES_PATHNAME:
      isHidden = false;
      break;

    default:
      isHidden = true;
  }

  return (
    <footer className={`footer ${isHidden ? "footer_display_none" : ""}`}>
      <p className="footer__text footer__text_color_grey">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__flex-container">
        <p className="footer__text footer__text_color_black footer__text_color_grey-year">
          © 2023
        </p>
        <div className="footer__container">
          <Link
            to="https://practicum.yandex.ru"
            className="footer__link footer__link_color_black"
          >
            Яндекс.Практикум
          </Link>
          <Link
            to="https://github.com"
            className="footer__link footer__link_color_black"
          >
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
}
