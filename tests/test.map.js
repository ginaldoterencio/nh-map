require.config({
  baseUrl: "../"
});

var specs = [
  'src/nh-map'
];

mocha.setup('bdd');
should = chai.should();

require(specs, function(NhMap) {

  var origin = new google.maps.LatLng(-20.541610, -47.412334),
      destination = new google.maps.LatLng(-20.505254, -47.394643);

  describe('NhMap', function() {
    var origin = origin = new google.maps.LatLng(-20.541610, -47.412334),
        destination = new google.maps.LatLng(-20.505254, -47.394643);

    it('should be a object', function() {
      NhMap.should.be.a('object');
    });

    it('should have a `create` property', function() {
      NhMap.should.have.property('create');
    });

    it('`create` property should be a function', function() {
      NhMap.create.should.be.a('function');
    });

    it('`create` function call should return a object', function() {
      var map = NhMap.create(origin, destination, function(routes) {});
      map.should.be.a('object');
    });

    it('`create` function call should have a `calculateRoute` property', function() {
      var map = NhMap.create(origin, destination, function(routes) {});
      map.should.have.property('calculateRoute');
    });

    it('`calculateRoute` property should be a function', function() {
      var map = NhMap.create(origin, destination, function(routes) {});
      map.calculateRoute.should.be.a('function');
    });

    it('`calculateRoute` call function should be a function', function() {
      var map = NhMap.create(origin, destination, function(routes) {});
      map.calculateRoute.should.be.a('function');
    });

    it('`calculateRoute` function callback should return an array', function(done) {
      var map = new NhMap.create(origin, destination, function(routes) {
        routes.should.be.an('array');
        done();
      });

      map.calculateRoute();
    });
  });
  mocha.run();
});