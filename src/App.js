import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Hero />
    </div>
  );
}

export default App;
