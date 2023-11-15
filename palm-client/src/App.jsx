import { useState, useRef } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import "./chat.css";

marked.use({
  gfm: true,
});

function App() {
  const [serverData, setServerData] = useState([{}]);
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
    setServerData("");
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
          setServerData({ ...data, html });
          inputRef.current.focus();
          setUserPrompt("");
        });
    }
  }

  return (
    <main className="main-container">
      <h1 className="h1-chat">MyPrompter</h1>
      <div className="div-chat">
        <div className="max-width-height">
          {serverData === "" ? (
            "Loading..."
          ) : (
            <article
              style={{ margin: "0" }}
              dangerouslySetInnerHTML={{ __html: serverData.html }}
            />
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
          placeholder="Type in Prompt..."
        />
        <button onClick={handleSubmit} className="button">
          Submit
        </button>
      </div>
    </main>
  );
}

export default App;
