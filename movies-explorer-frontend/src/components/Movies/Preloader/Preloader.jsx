import preloader from "../../../images/preloader.svg";

export default function Preloader({}) {
    return (
        <div className="preloader">
          <img src={preloader} className="preloader__image" alt="" />
        </div>
    )}