import { useNavigate } from "react-router-dom";

export default function NotFound({}) {
  const navigate = useNavigate();
  return (
    <main>
      <section className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
        <button className="not-found__back" onClick={() => navigate(-1)}>
          Назад
        </button>
      </section>
    </main>
  );
}
