(function($) {
  jQuery.fn.app = function(settings) {
    var config = { foo: "bar" };

    var game = $("<div>");
    var playersEl = $("<div>");

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
                $.db.setName(
                  $(this)
                    .val()
                    .trim()
                );
              }
            })
        );
    }

    function createPlayer({ id, name }) {
      console.log("player:", { id, name });

      return $("<a>")
        .addClass("list-group-item list-group-item-action player")
        .data("player", { id, name })
        .text(name)
        .attr("href", "#");
    }

    this.each(function() {
      var el = $(this);

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
                      $("<div>")
                        .addClass("card-body")
                        .append(
                          game
                            .addClass("d-flex flex-row justify-content-center")
                            .append(
                              $("<div>").token({ image: "./assets/images/rock.png", name: "rock" }),
                              $("<div>").token({ image: "./assets/images/paper.png", name: "paper" }),
                              $("<div>").token({ image: "./assets/images/scissors.png", name: "scissors" })
                            )
                            .on("click", ".token", function(e) {
                              console.log($(this).data("name"));
                            }),
                          $("<div>").append($("<span>").text("Player A: "), $("<span>").attr("id", "playerA")),
                          $("<div>").append($("<span>").text("Player B: "), $("<span>").attr("id", "playerB"))
                        )
                    )
                ),

              $("<div>")
                .addClass("col-3 col-sm-4 no-gutters")
                .append(
                  $("<div>")
                    .addClass("card")
                    .append(
                      $("<div>")
                        .addClass("card-header")
                        .text("Players"),
                      playersEl
                        .addClass("list-group list-group-flush")
                        .append(createMe())
                        .on("click", ".player", function(e) {
                          e.preventDefault();
                          $.db.startGame($(".player-me").data("player"), $(this).data("player"));
                        })
                    )
                )
            )
          // $("<div>")
          //   .addClass("row")
          //   .append(
          //     $("<div>")
          //       .addClass("col-12")
          //       .append(
          //         $("<form>")
          //           .addClass("form-inline ")
          //           .append(
          //             $("<div>")
          //               .addClass("input-group w-100")
          //               .append(
          //                 $("<input>")
          //                   .addClass("form-control mr-sm-2 my-2")
          //                   .attr("name", "input"),
          //                 $("<button>")
          //                   .addClass("btn btn-outline-dark my-2")
          //                   .text("send")
          //               )
          //           )
          //       )
          //  )
        )
        .on("submit", "form", function(e) {
          e.preventDefault();
          console.log($(this).serializeArray());
          $(this).trigger("reset");
        });

      // game.hide();

      $("body").on("me.player", function(e, player) {
        console.log("me:", player);

        if (player && player.name && player.name.length > 0) {
          $(".player-me > input").remove();
          $(".player-me")
            .data("player", player)
            .text(player.name);
        }
      });

      $("body").on("players", function(e, players) {
        playersEl.find(".player").remove();
        playersEl.append(players.map(player => createPlayer(player)));
      });
      0;

      function getName({ id, name }) {
        console.log("getName", $(".player-me").data("player"));

        // if (id == $(".player-me").data("player").id) {
        //   name += " (you)";
        // }

        return name;
      }

      $("body").on("game", function(e, game) {
        console.log("game:", game);
        var keys = Object.keys(game);
        $("#playerA").text(getName({ id: keys[0], name: game[keys[0]].name }));
        $("#playerB").text(getName({ id: keys[1], name: game[keys[1]].name }));
      });
    });

    return this;
  };
})(jQuery);
