import { Message } from "./types";

export const generic = (message: string) => ({
  body: message,
  sender: {
    id: "server",
    color: "red",
  },
});

export const userLeave = (userId: string): Message => ({
  body: `${userId.substr(0, 6)} has left the room`,
  sender: {
    id: "server",
    color: "red",
  },
});

export const userJoin = (userId: string, roomId: string): Message => ({
  body: `${userId.substr(0, 6)} has joined the room, welcome to: ${roomId}`,
  sender: {
    id: "server",
    color: "red",
  },
});

export const badIdError = (userId: string): Message => ({
  body: `${userId.substr(0, 6)} tried to send a message but has a bad ID`,
  sender: {
    id: "server",
    color: "red",
  },
});

export const who = (userIds: Array<string>): Message => ({
  body: `users online: ${userIds.join(", ")}`,
  sender: {
    id: "server",
    color: "red",
  },
});
