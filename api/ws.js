let clients = [];

export const config = { runtime: "edge" };

export default (req) => {
  const { socket } = req;
  socket.accept();
  clients.push(socket);

  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "new_update") {
      // Broadcast update to all clients
      clients.forEach((ws) =>
        ws.send(JSON.stringify({ type: "update", matchId: data.matchId, update: data.update }))
      );
    }
  });

  socket.addEventListener("close", () => {
    clients = clients.filter((c) => c !== socket);
  });
};
