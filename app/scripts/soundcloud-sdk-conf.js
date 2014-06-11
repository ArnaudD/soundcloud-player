(function() {

  var location   = document.location,
      production = (location.port === ''),
      prodId     = "17339991d463dbb8af20d84340007426",
      devId      = "d763deeb0866aec73c61aac7de6aa1fa";

  // Fake storage for soundcloud
  SC.storage = function () { return window.localStorage; };

  SC.initialize({
    client_id: production ? prodId : devId,
    redirect_uri: "http://" + location.host + "/sc-callback.html",
  });

})();