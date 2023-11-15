import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

marked.use({
  gfm: true,
})

// Styles
import "./chat.css";

function App() {
  const [serverData, setServerData] = useState('');
  const [userPrompt, setUserPrompt] = useState('');

  function handleSubmit() {
    fetch("/api", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'prompt': userPrompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        const html = DOMPurify.sanitize(marked(data));
        setServerData({ ...data, html});
        console.log(serverData);
      });
  }

  return (
    <main className="main-container">
      <h1 className="h1-chat">Hello, world!</h1>
      <div className="div-chat">
        <div className="max-width-height">
          <article style={{ margin: "0" }} dangerouslySetInnerHTML={{ __html: serverData.html }} />
        </div>
      </div>
      <div className="div-text-area">
        <textarea onChange={(e) => setUserPrompt(e.target.value)} className="textarea" placeholder="Ingresa tu prompt..." />
        <button onClick={handleSubmit} className="button">Send</button>
      </div>
    </main>
  );
}

export default App;
