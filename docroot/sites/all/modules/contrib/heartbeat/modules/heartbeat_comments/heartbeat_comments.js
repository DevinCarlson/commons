/**
 * Heartbeat comments object
 */
Drupal.heartbeat = Drupal.heartbeat || {};

Drupal.heartbeat.comments = Drupal.heartbeat.comments || {};

/**
 * Attach behaviours to the message streams
 */
Drupal.behaviors.heartbeat_comments = function (context) {
  $('.heartbeat-comment-submit', context).each(function() {
    $(this).bind('click', function(e) { return Drupal.heartbeat.comments.submit(this); } );
  });
}

Drupal.heartbeat.comments.submit = function(element) {
  
  var formElement = $(element).parents('form');
  
  var url = Drupal.settings.basePath + 'heartbeat/comment/post';
  var args = {
    message: formElement.find('.heartbeat-message-comment').val(), 
    uaid: formElement.find('.heartbeat-message-uaid').val(), 
    nid: formElement.find('.heartbeat-message-nid').val(), 
    node_comment: formElement.find('.heartbeat-message-node-comment').val()
  };
  $.post(url, args, Drupal.heartbeat.comments.submitted,'json');
  
  return false;
}

Drupal.heartbeat.comments.submitted = function(data) {
  if (data.id != undefined) {
    
    if (!$('#heartbeat-comments-list-' + data.id).length) {
      var html = '<ul class="summary" id="heartbeat-comments-list-' + data.id + '"></ul>';
      if (Drupal.settings.heartbeat_comments_position == 'up') {
        $('#heartbeat-comments-wrapper-' + data.id).append(html);
      }
      else {
        $('#heartbeat-comments-wrapper-' + data.id).prepend(html);
      }
    }
    
    if (Drupal.settings.heartbeat_comments_order == 'oldest_on_top') {
      $('#heartbeat-comments-list-' + data.id).append(data.data);
    }
    else {
      $('#heartbeat-comments-list-' + data.id).prepend(data.data);
    }
    
    $('#heartbeat-comments-list-' + data.id).parents('.heartbeat-comments').find('.heartbeat-message-comment').val('');
    
    //Drupal.attachBehaviors($('.heartbeat-stream'));
  }
}