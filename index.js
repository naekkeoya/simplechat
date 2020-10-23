var PORT = process.env.PORT || 4000;
var express = require ('express');
var socket = require ('socket.io');

var app = express();
var server = app.listen(PORT, function(){
  console.log(`Server listening at http://localhost:${PORT}`);
});

app.use (express.static('public'))

var io = socket(server);

io.on('connection',function(socket){
  console.log('made socket connection', socket.id);

  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
  });

  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data);
  });

});
