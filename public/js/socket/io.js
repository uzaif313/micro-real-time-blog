$(function() {
  var socket = io();

  // handle tweet form submit event
  $('#tweet_it').on('submit',handleSubmit)

  //  Broadcast tweet to all user via listing on inComingTweets listner

  socket.on("inComingTweets", function(data){
    console.log(data)
  })


  /**
  * callback for handle submit event
  * @param {Object} e for handle jquery Event
  **/
  function handleSubmit(e) {
    _content = $('#tweet').val();
    socket.emit('tweet', {content: _content})
    $('#tweet').val('')
    e.preventDefault();
  }
})
