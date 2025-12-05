import { useEffect, useState } from "react";
import LiveMatch from "./LiveMatch.jsx";
import Admin from "./Admin.jsx";

export default function App() {
  const [matches, setMatches] = useState([]);
  const [selected, setSelected] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/matches").then((res) => res.json()).then(setMatches);
  }, []);

  if (selected) return <LiveMatch id={selected} back={() => setSelected(null)} />;
  if (admin) return <Admin back={() => setAdmin(false)} />;

  return (
    <div style={{ padding: 20 }}>
      <h1>AFCON Live Portal</h1>
      <button onClick={() => setAdmin(true)}>Admin Mode</button>
      <h2>Matches</h2>
      {matches.map((m) => (
        <div
          key={m.id}
          onClick={() => setSelected(m.id)}
          style={{ padding: 15, border: "1px solid #ddd", marginBottom: 10, cursor: "pointer" }}
        >
          <b>{m.home}</b> vs <b>{m.away}</b>
          <div>{m.date}</div>
          <div>Status: {m.status}</div>
        </div>
      ))}
    </div>
  );
}
