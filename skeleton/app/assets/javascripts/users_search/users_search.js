$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find('input');
  this.$ul = this.$el.find('.users');
  this.handleInput();
}

$.UsersSearch.prototype.handleInput = function () {
  var that = this;
  this.$el.on('input', function() {
    $.ajax({
      url: "/users/search",
      type: "GET",
      data: { query: that.$input.val() },
      dataType: 'json',
      success: function (data) {
        return that.renderResults(data);

      }
    });
  });
}


$.UsersSearch.prototype.renderResults = function (results) {
  this.$ul.empty();
  var that = this;
  $(results).each(function() {
    var $link = $('<a href="users/' + this.id + '">' ).text(this.username);
    var followStatus = this.followed ? "followed" : "unfollowed";
    var $button = $('<button>')
    .addClass('follow-toggle')
    .data('user-id', this.id)
      .data('initial-follow-state',followStatus).followToggle();
    var $li = $('<li>').append($link).append($button);
    that.$ul.append($li);
  })

  // results.each(function () {
  //   $('<a href =users/' + this + ).text(this)
  // })
}

$.fn.usersSearch = function () {
    return this.each(function () {
      new $.UsersSearch(this);
    });
};

$(function () {
  $('.users-search').usersSearch();
});
