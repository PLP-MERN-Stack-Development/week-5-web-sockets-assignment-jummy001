export const handleSocketEvents = (io, socket) => {
  // Broadcast when a user joins
  socket.on('join', (username) => {
    socket.username = username;
    socket.broadcast.emit('userJoined', `${username} joined the chat`);
  });

  // Handle new messages
  socket.on('chatMessage', (message) => {
    const payload = {
      username: socket.username,
      text: message,
      timestamp: new Date().toISOString()
    };
    io.emit('chatMessage', payload);
  });

  // Typing indicator
  socket.on('typing', () => {
    socket.broadcast.emit('typing', socket.username);
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping', socket.username);
  });
};
