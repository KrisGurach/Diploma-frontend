import { useNavigate } from "react-router-dom";

export default function NotFound({}) {
  const navigate = useNavigate();
  return (
    <main>
      <section className="notFound">
        <h1 className="notFound__title">404</h1>
        <p className="notFound__text">Страница не найдена</p>
        <button className="notFound__back" onClick={() => navigate(-1)}>
          Назад
        </button>
      </section>
    </main>
  );
}
