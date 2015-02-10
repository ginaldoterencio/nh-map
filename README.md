# NhMap
AMD module for google map api's functions's abstractions

## Instalation
    bower install nh-map
  
## Demonstration
    require(['bower_components/src/nh-map'], function(NhMap) {
        var origin = new google.maps.LatLng(-20.541610, -47.412334),
            destination = new google.maps.LatLng(-20.505254, -47.394643),
            map = new NhMap.create(origin, destination, function(routes) {
            });

        map.calculateRoute();
    });