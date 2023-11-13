import preloader from "../../images/preloader.svg";

export default function Preloader({ isLoading }) {
  return (
    <section className={`preloader ${isLoading ? "preloader_active" : ""}`}>
      <img src={preloader} className="preloader__image" alt="" />
    </section>
  );
}
