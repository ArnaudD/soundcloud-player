
describe('Service: Collection', function () {

  // load the service's module
  beforeEach(module('soundcloudPlayerApp'));

  var Collection,
      originalTimeout,
      items = [1, 2, 3],
      items2 = [4, 5, 6],
      scope,
      stream,
      SCMock = {};

  SCMock.get = function (url, callback) {
    setTimeout(function () {
      var coll = (url === 'next_href' ? items2 : items);

      callback({
        next_href: 'next_href',
        collection: coll
      }, false);
    }, 30);
  };


  beforeEach(inject(function (_Collection_, _$rootScope_) {
    Collection = _Collection_;
    if (!scope) {
      scope = _$rootScope_.$new();
    }
    window.SC = SCMock;
  }));
  
  spyOn(SCMock, 'get').and.callThrough();

  it('loadNext() should populate items', function (done) {
    stream = Collection.getStream();

    // Dirty trick to call 'then' on the resolved promise inside loadNext()
    setTimeout(function(){scope.$digest();}, 50);
    
    stream.loadNext().then(function () {
      expect(stream.items).toEqual(items);
      done();
    }, function () {
      // TODO Fails !
    });

  });

  it('calling loadNext() AGAIN should add items', function (done) {

    // Dirty trick to call 'then' on the resolved promise inside loadNext()
    setTimeout(function(){scope.$digest();}, 500);
    
    stream.loadNext().then(function () {
      expect(stream.items).toEqual(items.concat(items2));
      done();
    }, function () {
      // TODO Fails !
    });

  });

});
