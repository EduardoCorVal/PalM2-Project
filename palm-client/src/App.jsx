import { useState } from "react";
import "./chat.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="main-container">
      <h1 className="h1-chat">Hello, world!</h1>
      <div className="div-chat">
        <div className="max-width-height">
          <article style={{ margin: '0' }}/>
        </div>
      </div>
      <div className="div-text-area">
        <textarea className="textarea" placeholder="Ingresa tu prompt..."/>
        <button className="button">Send</button>
      </div>
    </main>
  );
}

export default App;
