requirejs.config({
  paths: {
    async: 'bower_components/requirejs-plugins/src/async'
  }
});

define(['async!http://maps.google.com/maps/api/js?v=3&sensor=false'], function() {
  var directionsService,
      origin,
      destination,
      routes,
      callback,
      travelModes;

  function NhMaps(pOrigin, pDestination, pCallback) {
    directionsService = new google.maps.DirectionsService();
    origin = pOrigin;
    destination = pDestination;
    routes = [];
    callback = pCallback;
    travelModes = [
      google.maps.TravelMode.DRIVING,
      google.maps.TravelMode.BICYCLING,
      google.maps.TravelMode.TRANSIT,
      google.maps.TravelMode.WALKING
    ];
  }

  NhMaps.prototype.calculateRoute = function() {
    for(var i = 0, j = travelModes.length; i < j; i++) {
      var request = {
        origin: origin,
        destination: destination,
        travelMode: travelModes[i]
      };

      directionsService.route(request, onRoute);
    }
  }

  function onRoute(result, status) {
    var route,
        legs;

    if(status === google.maps.DirectionsStatus.OK) {
      route = result.routes[0],
      legs = route.legs;

      routes.push({
        duration: getSumDurationLegs(result.routes[0]),
        origin: legs[0].start_address,
        destination: legs[legs.length - 1].end_address,
      });
    }

    if(result.mc.travelMode === travelModes[travelModes.length - 1]) {
      callback.call(this, routes);
    }
  }

  function getSumDurationLegs(route) {
    var legs = route.legs,
        duration = 0;

    for(var i = 0, j = legs.length; i < j; i++) {
      duration += legs[i].duration.value;
    }

    return {
      value: duration,
      text: Math.ceil(duration / 60) + ' minutos'
    };
  }

  return {
    create: function(origin, destination, callback) {
      return new NhMaps(origin, destination, callback);
    }
  };
});
