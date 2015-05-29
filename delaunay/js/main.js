$(function(){
  Pace.on("done", function(){
    $('#block').toggleClass('after');
  });

  $("#block").bind("webkitTransitionEnd transitionend",function(){
    $(this).hide();
  });

});
