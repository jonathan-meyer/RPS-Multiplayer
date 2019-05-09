(function($) {
  jQuery.fn.app = function(settings) {
    var config = { foo: "bar" };

    if (settings) jQuery.extend(config, settings);

    this.each(function() {
      var el = $(this);

      el.append(
        $("<div>")
          .addClass("d-flex flex-row justify-content-center")
          .append(
            $("<div>").token({ image: "./assets/images/rock.png", name: "rock" }),
            $("<div>").token({ image: "./assets/images/paper.png", name: "paper" }),
            $("<div>").token({ image: "./assets/images/scissors.png", name: "scissors" })
          )
      ).on("click", ".token", function(e) {
        e.preventDefault();
        console.log($(this).data("name"));
      });
    });

    return this;
  };
})(jQuery);
