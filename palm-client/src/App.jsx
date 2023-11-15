import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Hello, world!</h1>
      <article/>
        <div>
          <textarea/>
          <button>Send</button>
        </div>
    </main>
  );
}

export default App;
