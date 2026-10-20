import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("Checking server...");

  useEffect(() => {
    fetch("http://localhost:3000/api/health")
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.status);
      });
  }, []);

  return (
    <div>
      <h1>CivicPath 🇪🇹</h1>
      <p>Backend status: {status}</p>
    </div>
  );
}

export default App;