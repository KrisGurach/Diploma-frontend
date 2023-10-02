import "./App.css";
import Header from "../Header/Header.jsx";
import Promo from "../Main/Promo/Promo";
import NavTab from "../Main/Navtab/NavTab";
import AboutProject from "../Main/AboutProject/AboutProject";
import Techs from "../Main/Techs/Techs.jsx";
import AboutMe from "../Main/AboutMe/AboutMe";
import Portfolio from "../Main/Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import LoginV2 from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";

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
        {/* <Route path="*" element={NotFound} /> */}

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
