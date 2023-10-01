import './App.css';
import Header from '../Header/Header.jsx';
import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/Navtab/NavTab';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs.jsx';
import AboutMe from '../Main/AboutMe/AboutMe'
import Portfolio from '../Main/Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe /> 
      <Portfolio /> 
      <Footer />  
    </div>
  );
}

export default App;
