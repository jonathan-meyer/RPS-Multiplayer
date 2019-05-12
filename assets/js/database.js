(function($) {
  firebase.initializeApp({
    apiKey: "AIzaSyDoizjzJgA_55Hxq879rD0mSFps-LVt47c",
    authDomain: "rock-paper-scissors-1776.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-1776.firebaseio.com",
    projectId: "rock-paper-scissors-1776",
    storageBucket: "rock-paper-scissors-1776.appspot.com",
    messagingSenderId: "637303749509",
    appId: "1:637303749509:web:73aabb03ad8dd251"
  });

  var db = firebase.database();
  var players = db.ref("players");
  var game = db.ref("game");
  var me = null;

  $.uuid().then(uuid => {
    me = players.child(uuid);

    me.child("name").on("value", function(snap) {
      $("body").trigger("me.player", { id: uuid, name: snap.val() });
    });

    players.on("value", function(snap) {
      if (snap.val()) {
        $("body").trigger("players", [
          Object.entries(snap.toJSON())
            .map(([key, value]) => ({ id: key, name: value.name }))
            .filter(player => player.id != uuid)
        ]);
      }
    });
  });

  game.on("value", function(snap) {
    $("body").trigger("game", snap.val());
  });

  $.db = {
    setName: name => {
      me.child("name").set(name);
    },
    startGame: (playerA, playerB) => {
      game.set({ [playerA.id]: { name: playerA.name }, [playerB.id]: { name: playerB.name } });
    },
    play: (player, play) => {
      game.child(player.id).set({ play });
    }
  };
})(jQuery);
