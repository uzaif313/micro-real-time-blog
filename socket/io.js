module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('Just connected');
    const user = socket.request.user;
    console.log(user.name)

    socket.on('tweet', (data)=>{
      console.log(data)
    })
  });
};
