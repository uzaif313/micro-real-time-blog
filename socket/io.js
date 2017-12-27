const async = require('async');
const User  = require("../models/user")
const Tweet  = require("../models/tweet")
module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('Just connected');
    const user = socket.request.user;
    console.log(user.name)

    socket.on('tweet', (data)=>{
      async.parallel([
        function(cb){
          io.emit('inComingTweets', { data:user })
        },
      ])
    })
  });
};
