$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.render();
  this.handleClick();
};

$.FollowToggle.prototype.render = function () {
  if (this.followState === "unfollowing") {
    this.$el.prop('disabled', true);
    this.$el.text('Unfollowing');
  } else if (this.followState === "following") {
    this.$el.prop('disabled', true);
    this.$el.text('Following');
  } else if (this.followState === "unfollowed") {
    this.$el.text("Follow!");
    this.$el.prop('disabled', false);
  } else if (this.followState === "followed") {
    this.$el.text("Unfollow!");
    this.$el.prop('disabled', false);
  }
};

$.FollowToggle.prototype.handleClick = function () {
  var that = this
  this.$el.on("click", function(event) {
    event.preventDefault();
    if(that.followState === "unfollowed"){
      that.followState = "following";
      var options = {
        url: '/users/' + that.userId + '/follow',
        type: "POST",
        dataType: "json",
        success: function () {
          that.followState = "followed";
          that.render();
        }
      }
    } else if (that.followState === "followed") {
      that.followState = "unfollowing";
      var options = {
        url: '/users/' + that.userId + '/follow',
        type: "DELETE",
        dataType: "json",
        success: function () {
          that.followState = "unfollowed";
          that.render();
        }
      }
    }

    that.render();
    $.ajax(options);
  })
};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
