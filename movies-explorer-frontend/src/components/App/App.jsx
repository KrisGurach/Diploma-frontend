import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import { Route, Routes } from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import { useState } from "react";
import {
  mainPathname,
  moviesPathname,
  profilePathname,
  savedMoviesPathname,
  signInPathname,
  signUpPathname,
} from "../../utils/constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} />
      <Routes>

        {/* Лэндинг главный */}
        <Route path={mainPathname} element={<Main />} />

        {/* Страница "Все фильмы" */}
        <Route path={moviesPathname} element={<Movies />} />

        {/* Страница "Сохраненные фильмы" */}
        <Route path={savedMoviesPathname} element={<SavedMovies />} />

        {/* Вход */}
        <Route path={signInPathname} element={<Login />} />

        {/* Регистрация */}
        <Route path={signUpPathname} element={<Register />} />

        {/* Профиль */}
        <Route path={profilePathname} element={<Profile />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} /> 

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
