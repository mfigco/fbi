import placeholder from './placeholder.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
    <header>
      <h1>
        FBI Most Wanted
      </h1>      
    </header>
    <div className="body">
        <form className="search-fields">
            <div>
                <h2>Age</h2>
                <input type="number" defaultValue="20" onfocus="this.value=''" min="20" max="80"/>
                <label>to</label>
                <input type="number" defaultValue="80" onfocus="this.value=''" min="20" max="80"/>
                <label>years</label>
            </div>
            <div>
                <h2>Sex</h2>
                <div className = "radio-div">
                    <input type="radio" id="sex-any" name="sex"/>
                    <label htmlFor="sex-any">Any</label>
                    <input type="radio" id="sex-male" name="sex"/>
                    <label htmlFor="sex-male">Male</label>
                    <input type="radio" id="sex-female" name="sex"/>
                    <label htmlFor="sex-female">Female</label>
                </div>                
            </div>
            <div>
                <h2>Hair</h2>
                <div className = "radio-div">
                    <input type="radio" id="hair-any" name="hair"/>
                    <label htmlFor="hair-any">Any</label>
                    <input type="radio" id="hair-gray" name="hair"/>
                    <label htmlFor="hair-gray">Gray</label>
                    <input type="radio" id="hair-black" name="hair"/>
                    <label htmlFor="hair-black">Black</label>
                    <input type="radio" id="hair-blonde" name="hair"/>
                    <label htmlFor="hair-blonde">Blond</label>
                    <input type="radio" id="hair-brown" name="hair"/>
                    <label htmlFor="hair-brown">Brown</label>
                </div> 
            </div>
            <div>
                <h2>Eyes</h2>
                <div className = "radio-div">
                    <input type="radio" id="eyes-any" name="eyes"/>
                    <label htmlFor="eyes-any">Any</label>
                    <input type="radio" id="eyes-brown" name="eyes"/>
                    <label htmlFor="eyes-brown">Brown</label>
                    <input type="radio" id="eyes-blue" name="eyes"/>
                    <label htmlFor="eyes-blue">Blue</label>
                    <input type="radio" id="eyes-green" name="eyes"/>
                    <label htmlFor="eyes-green">Green</label>
                    <input type="radio" id="eyes-dark" name="eyes"/>
                    <label htmlFor="eyes-dark">Dark</label>
                </div> 
            </div>
        </form>
        <div className="img-container">
            <img src={placeholder} className="wanted-photo" alt="Wanted"/>
        </div>
    </div>
    <footer>
        <button>
            Search
        </button>
    </footer>
  </div>
  );
}

export default App;
