(function($) {
  jQuery.fn.token = function(settings) {
    var config = { image: "" };

    if (settings) jQuery.extend(config, settings);

    this.each(function() {
      $(this).append($("<img>").attr("src", config.image));
    });

    return this;
  };
})(jQuery);
