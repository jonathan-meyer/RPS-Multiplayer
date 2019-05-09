(function($) {
  jQuery.fn.token = function(settings) {
    var config = { image: "image.png", name: "An Image", size: 200 };

    if (settings) jQuery.extend(config, settings);

    this.each(function() {
      $(this)
        .addClass("token d-flex justify-content-center align-items-center")
        .css({ width: config.size, height: config.size, cursor: "pointer" })
        .data("name", config.name)
        .append(
          $("<img>")
            .addClass("img-fluid")
            .attr({ src: config.image, alt: config.name })
        );
    });

    return this;
  };
})(jQuery);
