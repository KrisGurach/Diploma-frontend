import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import { useEffect, useState } from "react";
import {
  mainPathname,
  moviesPathname,
  profilePathname,
  savedMoviesPathname,
  signInPathname,
  signUpPathname,
} from "../../utils/constants";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import auth from "../../utils/Api/AuthApi";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn])

  const handleUpdateUser = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleTokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            const { email, name, _id } = res;
            setCurrentUser({ email, name, _id });
            setIsLoggedIn(true);

            const protectedRoutes = [
              moviesPathname,
              savedMoviesPathname,
              profilePathname,
            ];
            const path = protectedRoutes.includes(pathname)
              ? pathname
              : mainPathname;
            navigate(path, { replace: true });
          }
        })
        .catch(console.error);
    }
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        {/* Лэндинг главный */}
        <Route path={mainPathname} element={<Main />} />

        {/* Страница "Все фильмы" */}
        <Route
          path={moviesPathname}
          element={
            <ProtectedRouteElement element={Movies} isLoggedIn={isLoggedIn} />
          }
        />

        {/* Страница "Сохраненные фильмы" */}
        <Route
          path={savedMoviesPathname}
          element={
            <ProtectedRouteElement
              element={SavedMovies}
              isLoggedIn={isLoggedIn}
            />
          }
        />

        {/* Вход */}
        <Route
          path={signInPathname}
          element={
            <Login
              handleLogin={handleLogin}
              handleUpdateUser={handleUpdateUser}
            />
          }
        />

        {/* Регистрация */}
        <Route
          path={signUpPathname}
          element={
            <Register
              handleLogin={handleLogin}
              handleUpdateUser={handleUpdateUser}
            />
          }
        />

        {/* Профиль */}
        <Route
          path={profilePathname}
          element={
            <ProtectedRouteElement
              element={Profile}
              currentUser={currentUser}
              onUpdateUser={handleUpdateUser}
              handleSignOut={handleLogin}
              isLoggedIn={isLoggedIn}
            />
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
