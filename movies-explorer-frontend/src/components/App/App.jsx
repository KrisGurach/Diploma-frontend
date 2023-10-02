import './App.css';
import Header from '../Header/Header.jsx';
import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/Navtab/NavTab';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs.jsx';
import AboutMe from '../Main/AboutMe/AboutMe'
import Portfolio from '../Main/Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import LoginV2 from '../Login/Login';

function App() {
  return (
    <div className="App">
      {/* Лэндинг главный
       <Header />
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe /> 
      <Portfolio /> 
      <Footer />   */}

      {/* Страница "Все фильмы"
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />  */}

      {/* Страница "Сохраненные фильмы" */}

      {/* Логин */}
      <LoginV2 />

      {/* Регистрация */}


      {/* Профиль
      <Header />
       */}


      {/* 404 */}


    </div>
  );
}

export default App;
