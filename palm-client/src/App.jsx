import { useState, useRef } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import "./chat.css";

marked.use({
  gfm: true,
});

function App() {
  const [messageHistory, setMessageHistory] = useState([]);
  // const [serverData, setServerData] = useState([{}]);
  const [userPrompt, setUserPrompt] = useState("");
  const inputRef = useRef(null);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      inputRef.current.blur();
      handleSubmit();
    }
  }

  function handleSubmit() {
    if (userPrompt !== "") {
      fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      })
        .then((res) => res.json())
        .then((data) => {
          const html = DOMPurify.sanitize(marked(data));
          const newMessage = { user: userPrompt, response: html };

          setMessageHistory([...messageHistory, newMessage]);
          setUserPrompt("");
          inputRef.current.focus();
        });
    }
  }

  return (
    <main className="main-container">
      <h1 className="h1-chat">VEGA Chatbot</h1>
      <div className="div-chat">
        <div className="max-width-height">
          {messageHistory.length === 0 ? (
            <p className="vega-welcome">
              Hi, I am VEGA, your personal chatbot. How can I help you?
            </p>
          ) : (
            messageHistory.map((message, index) => (
              <div key={index}>
                <p className="user-message">{message.user}</p>
                <article dangerouslySetInnerHTML={{ __html: message.response }} />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="div-text-area">
        <textarea
          onChange={(e) => setUserPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={userPrompt}
          className="textarea"
          placeholder="Message VEGA..."
        />
        <button onClick={handleSubmit} className="button">
          Send
        </button>
      </div>
    </main>
  );
}

export default App;
