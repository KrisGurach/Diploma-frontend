import { useNavigate } from "react-router-dom";

export default function NotFound({}) {
  const navigate = useNavigate();  
  return (
    <div className="notFound">
      <h2 className="notFound__title">404</h2>
      <p className="notFound__text">Страница не найдена</p>
      <button className="notFound__back" onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
}
