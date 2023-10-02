import "./App.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>

        {/* Лэндинг главный */}
        <Route path="/" element={<Main />} />

        {/* Страница "Все фильмы" */}
        <Route path="/movies" element={<Movies />} />

        {/* Страница "Сохраненные фильмы" */}
        {/* <Route path="/saved-movies" element={<SavedMovies />} /> */}

        {/* Вход */}
        <Route path="/signin" element={<Login />} />

        {/* Регистрация */}
        <Route path="/signup" element={<Register />} />

        {/* Профиль */}
        {/* <Route path="/profile" element={<Profile />} /> */}

        {/* 404 */}
        <Route path="*" element={<NotFound />} /> 

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
