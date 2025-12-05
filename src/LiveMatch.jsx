import { useEffect, useState } from "react";

export default function LiveMatch({ id, back }) {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    fetch("/api/matches").then((res) => res.json()).then((data) => setMatch(data.find((m) => m.id === id)));

    const socket = new WebSocket("wss://" + window.location.host + "/api/ws");
    socket.addEventListener("message", (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "update" && msg.matchId === id) {
        setMatch((prev) => ({
          ...prev,
          updates: [msg.update, ...prev.updates]
        }));
      }
    });
    return () => socket.close();
  }, []);

  if (!match) return <h2>Loading…</h2>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={back}>← Back</button>
      <h2>{match.home} vs {match.away}</h2>
      <h3>Status: {match.status}</h3>
      <h2>Live Updates</h2>
      {match?.updates.map((u, i) => (
        <div key={i} style={{ padding: 10, borderBottom: "1px solid #ddd" }}>{u}</div>
      ))}
    </div>
  );
}
