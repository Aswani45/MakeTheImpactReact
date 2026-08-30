import { useEffect, useState } from "react";

function App() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  const loadInfo = async () => {
    try {
      setError(null);

      const response = await fetch("/api/info");

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      setInfo(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadInfo();
  }, []);

  return (
    <main>
      <h1>Full Stack Demo</h1>

      {error && <p>Error: {error}</p>}

      {!info && !error && <p>Loading...</p>}

      {info && (
        <>
          <p>
            <strong>App:</strong> {info.appName}
          </p>

          <p>
            <strong>Admin:</strong> {info.adminName}
          </p>

          <p>
            <strong>Backend time:</strong> {info.serverTime}
          </p>

          <button onClick={loadInfo}>
            Refresh
          </button>
        </>
      )}
    </main>
  );
}

export default App;