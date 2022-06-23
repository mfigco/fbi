import placeholder from './placeholder.jpg';
import './App.css';
import SearchFields from "./components/SearchFields.js"
import ImageContainer from "./components/ImageContainer.js"
import Footer from "./components/Footer.js"

function App() {
  const fields = [
      {name: "Sex", options: ["Any","Male","Female"]},
      {name: "Hair", options: ["Any","Gray","Black","Blond","Brown"]},
      {name: "Eyes", options: ["Any","Brown","Blue","Green","Dark"]}
  ]
  return (
    <div className="App">
    <header>
      <h1>
        FBI Most Wanted
      </h1>      
    </header>
    <div className="body">
        <SearchFields fields={fields}/>
        <ImageContainer img={placeholder}/>
    </div>
    <Footer/>
  </div>
  );
}

export default App;
