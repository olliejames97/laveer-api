import { Socket, Server } from "socket.io";
import { Message } from "./types";
import { userLeave, userJoin, who, generic } from "./serverMessages";

const server = require("http").createServer();
const io: Server = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.NODE_ENV === "development" ? 4004 : process.env.PORT;
const NEW_CHAT_MESSAGE_EVENT = "MESSAGE";

type Query = {
  roomId: string;
};

io.on("connection", (socket: Socket) => {
  console.log("connection");
  let online = [];

  if (!("roomId" in socket.handshake.query)) {
    console.log("bad message");
  }

  // Join a conversation
  socket.handshake.query;
  const { roomId } = socket.handshake.query as Query;

  socket.join(roomId);
  online.push({
    id: socket.id,
  });

  io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, userJoin(socket.id, roomId));

  io.in(roomId).emit(
    NEW_CHAT_MESSAGE_EVENT,
    generic(io.in(roomId).sockets.sockets.size + " online")
  );

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    const message = data as Message;
    // check message
    if (socket.id !== message.sender.id) {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, message);
    }

    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, message);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, userLeave(socket.id));
    console.log("connection closed");
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
