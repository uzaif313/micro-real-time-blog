$(function() {
  var socket = io();

  // handle tweet form submit event
  $('#tweet_it').on('submit',handleSubmit)

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
