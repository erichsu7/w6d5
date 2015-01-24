$.TweetCompose = function (el) {
  this.$el = $(el);
  this.$inputs = this.$el.find(":input");
  this.submit();
  this.counter();
}

$.TweetCompose.prototype.submit = function () {
  var that = this;
  this.$el.on("submit", function (event) {
    event.preventDefault();
    $currentTarget = $(event.currentTarget);
    var formData = $currentTarget.serializeJSON();
    that.$inputs.prop("disabled", true);
    $.ajax({
      url: "/tweets",
      type: "POST",
      data: formData,
      dataType: "json",
      success: function (data) {
        that.handleSuccess(data)
      }
    })
  })
}

$.TweetCompose.prototype.counter = function () {
  var that = this;
  var textarea = this.$inputs.filter("textarea");
  textarea.on('input', function(event) {
    var charsLeft = 140 -textarea.val().length;
    that.$el.find('.counter').text(charsLeft + " characters remaining");
  });
}


$.TweetCompose.prototype.clearInput = function () {
  this.$inputs.filter("textarea").val("");
  this.$inputs.filter("select").val("");
}

$.TweetCompose.prototype.handleSuccess = function (data) {
  // debugger;
  this.clearInput();
  this.$inputs.prop("disabled", false);
  $(this.$el.data("tweets-ul")).prepend(JSON.stringify(data.content));
}

$.fn.tweetCompose = function () {
  return this.each( function () {
    new $.TweetCompose(this);
  })
}

$(function () {
  $('.tweet-compose').tweetCompose();
});
