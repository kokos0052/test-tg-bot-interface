import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;


function App() {

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      text
    </div>
  );
}

export default App;
