$(function() {
  var socket = io();

  // handle tweet form submit event
  $('#tweet_it').on('submit',handleSubmit)

  //  Broadcast tweet to all user via listing on inComingTweets listner
  socket.on("inComingTweets", function(data){
    $("#tweets").prepend(buildTweetTemplate(data))
  })

  /**
  * creating template for tweet with dynamic object
  * @param {Object} obj for handle jquery Event
  **/
  function buildTweetTemplate(data) {
    var template  = '<div class="media">';
        template += '<div class="media-left">';
        template += '<a href="#">'
        template += '<img src="'+ data.user.photo + '" alt="photo" class="media-object"/>';
        template += '</a>';
        template += '</div>';
        template += '<div class="media-body">';
        template += '<h4 class="media-heading">'+data.user.name+'</h4>';
        template += '<p>';
        template +=  data.data.content
        template += '</p>';
        template += '</div>';
    return template
  }

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
