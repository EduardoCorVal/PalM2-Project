import { useState, useEffect } from "react";
import "./chat.css";

function App() {
  const [serverData, setServerData] = useState({});
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setServerData(data);
        console.log(data);
      });
  }, []);

  return (
    <main className="main-container">
      <h1 className="h1-chat">Hello, world!</h1>
      <div className="div-chat">
        <div className="max-width-height">
          <article style={{ margin: "0" }}>{serverData}</article>
        </div>
      </div>
      <div className="div-text-area">
        <textarea className="textarea" placeholder="Ingresa tu prompt..." />
        <button className="button">Send</button>
      </div>
    </main>
  );
}

export default App;
