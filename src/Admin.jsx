import { useEffect, useState } from "react";

export default function Admin({ back }) {
  const [matchId, setMatchId] = useState(1);
  const [text, setText] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("wss://" + window.location.host + "/api/ws");
    setWs(socket);
    return () => socket.close();
  }, []);

  const send = () => {
    ws.send(JSON.stringify({ type: "new_update", matchId: Number(matchId), update: text }));
    setText("");
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={back}>← Back</button>
      <h1>Admin Panel</h1>
      <p>Match ID:</p>
      <input value={matchId} onChange={e => setMatchId(e.target.value)} />
      <p>Update text:</p>
      <textarea rows="4" cols="40" value={text} onChange={e => setText(e.target.value)} />
      <br /><br />
      <button onClick={send}>Send Live Update</button>
    </div>
  );
}
