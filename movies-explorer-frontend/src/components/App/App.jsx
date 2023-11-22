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
  MAIN_PATHNAME,
  MOVIES_PATHNAME,
  PROFILE_PATHNAME,
  SAVED_MOVIES_PATHNAME,
  SIGNIN_PATHNAME,
  SIGNUP_PATHNAME,
} from "../../utils/constants";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import auth from "../../utils/Api/AuthApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  // constants
  const navigate = useNavigate();
  const { pathname } = useLocation();

  //state-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);

  // useEffects
  useEffect(() => {
    handleTokenCheck();
  }, []);

  // handlers for update and login user
  const handleUpdateUser = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogin = () => {
    // setIsLoggedIn(!isLoggedIn);
    if (!isLoggedIn) {
      handleTokenCheck();
      return;
    }

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

            const loginRoutes = [
              SIGNIN_PATHNAME,
              SIGNUP_PATHNAME
            ];
            const path = loginRoutes.includes(pathname)
              ? MOVIES_PATHNAME
              : pathname;
            navigate(path, { replace: true });
          }
        })
        .catch(console.error);
    }
  };

  const handleSavedMovies = (newMovies) => {
    setSavedMovies(newMovies);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          {/* Лэндинг главный */}
          <Route path={MAIN_PATHNAME} element={<Main />} />

          {/* Страница "Все фильмы" */}
          <Route
            path={MOVIES_PATHNAME}
            element={
              <ProtectedRouteElement
                element={Movies}
                isLoggedIn={isLoggedIn}
                savedMovies={savedMovies}
                handleSavedMovies={handleSavedMovies}
              />
            }
          />

          {/* Страница "Сохраненные фильмы" */}
          <Route
            path={SAVED_MOVIES_PATHNAME}
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                savedMovies={savedMovies}
                handleSavedMovies={handleSavedMovies}
                isLoggedIn={isLoggedIn}
              />
            }
          />

          {/* Вход */}
          <Route
            path={SIGNIN_PATHNAME}
            element={
              <Login
                handleLogin={handleLogin}
                handleUpdateUser={handleUpdateUser}
              />
            }
          />

          {/* Регистрация */}
          <Route
            path={SIGNUP_PATHNAME}
            element={
              <Register
                handleLogin={handleLogin}
                handleUpdateUser={handleUpdateUser}
              />
            }
          />

          {/* Профиль */}
          <Route
            path={PROFILE_PATHNAME}
            element={
              <ProtectedRouteElement
                element={Profile}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
