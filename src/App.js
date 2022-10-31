import logo from './logo.svg';
import './App.css';


function sayHello() {
  alert('You clicked me!');
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button class="button" onClick={sayHello}>Default</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://www.coolmathgames.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Got Games on your phone?
        </a>
        <p>
        </p>
      </header>
    </div>
  );
}

export default App;
