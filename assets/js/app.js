(function($) {
  jQuery.fn.app = function(settings) {
    var config = { foo: "bar" };
    var game = $("<div>");
    var chat = $("<div>");

    if (settings) jQuery.extend(config, settings);

    function createMe() {
      return $("<div>")
        .addClass("list-group-item list-group-item-primary player-me")
        .append(
          $("<input>")
            .addClass("form-control w-100 border-0 bg-transparent")
            .attr({
              placeholder: "Enter your name here"
            })
            .on("keyup", function(e) {
              if (e.keyCode === 13) {
                e.preventDefault();
                
                console.log("set my name:", $(this).val());

                $(this)
                  .attr("readonly", true)
                  .trigger("blur");
              }
            })
        );
    }

    function createPlayer(player) {
      return $("<a>")
        .addClass("list-group-item list-group-item-action player")
        .text(player)
        .attr("href", "#");
    }

    this.each(function() {
      var el = $(this);

      game.addClass("card-body");
      chat.addClass("list-group list-group-flush").append(createMe());

      el.addClass("app container p-1")
        .append(
          $("<div>")
            .addClass("row")
            .append(
              $("<div>")
                .addClass("col-auto no-gutters flex-grow-1")
                .append(
                  $("<div>")
                    .addClass("card ")
                    .append(
                      $("<div>")
                        .addClass("card-header")
                        .text("RPS Multplayer"),
                      game
                    )
                ),

              $("<div>")
                .addClass("col-3 no-gutters")
                .append(
                  $("<div>")
                    .addClass("card")
                    .append(
                      $("<div>")
                        .addClass("card-header")
                        .text("Players"),
                      chat
                    )
                )
            ),
          $("<div>")
            .addClass("row")
            .append(
              $("<div>")
                .addClass("col-12")
                .append(
                  $("<form>")
                    .addClass("form-inline ")
                    .append(
                      $("<div>")
                        .addClass("input-group w-100")
                        .append(
                          $("<input>")
                            .addClass("form-control mr-sm-2 my-2")
                            .attr("name", "input"),
                          $("<button>")
                            .addClass("btn btn-outline-dark my-2")
                            .text("send")
                        )
                    )
                )
            )
        )
        .on("submit", "form", function(e) {
          e.preventDefault();
          console.log($(this).serializeArray());
          $(this).trigger("reset");
        });
    });

    return this;
  };
})(jQuery);
