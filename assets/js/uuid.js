(function($) {
  $.uuid = () =>
    new Promise((resolve, reject) => {
      var idKey = "uuid";
      var idValue = sessionStorage.getItem(idKey);

      if (idValue == null) {
        $.ajax({ url: "https://www.uuidgenerator.net/api/version4" })
          .then(uuid => uuid.trim().replace("[\r\n]+", ""))
          .then(uuid => {
            sessionStorage.setItem(idKey, uuid);
            resolve(uuid);
          })
          .catch(reject);
      } else {
        resolve(idValue);
      }
    });
})(jQuery);
