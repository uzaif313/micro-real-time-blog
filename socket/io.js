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

        function(cb){
          async.waterfall([
            function(cb){
              var tweet = new Tweet()
              tweet.content = data.content;
              tweet.owner = user._id,
              tweet.save(function(err){
                cb(err,tweet)
              })
            },
            function(tweet,cb){
              User.update(
                {
                  _id: user._id
                },
                {
                  $push: { tweets:{tweet:tweet._id } },
                },function(err,count){
                  cb(err,count)
                }
              );
            }
          ]);
        }
      ])
    })
  });
};
