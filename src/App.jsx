import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import './App.css'
import Companies from "./components/Companies/Companies";
import Residencies from "./components/Residensies/Residencies";
import Value from "./components/Value/Value";
import Contact from "./components/Contact/Contact";
import Getstarted from "./components/Getstarted/Getstarted";
import Footer from "./components/Footer/Footer";
function App() {

  return (
    <div className="App">
      <div>
        <div className="white-gradient">

        </div>
      <Header />
      <Hero />
      </div>
      <Companies></Companies>
      <Residencies></Residencies>
      <Value></Value>
      <Contact></Contact>
      <Getstarted></Getstarted>
      <Footer></Footer>
    </div>
  );
}

export default App;
