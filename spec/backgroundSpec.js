describe('background', function() {
  var query;
  var numTabs;

  beforeEach(function() {
    query = jasmine.createSpy('tabs.query').and.callFake(function(args, callback) {
      var tabs = ['tab1', 'tab2'];
      numTabs = tabs.length;
      callback(tabs);
    });
  });

  it('increments and rolls over the new tab index', function() {
    var dir = 1;

    var index = 0;
    getNewPos(query, index, dir, function(newPos) {
      expect(newPos).toEqual(index + 1);
    });

    var indexRollover = 1;
    getNewPos(query, indexRollover, dir, function(newPos) {
      expect(newPos).toEqual(0);
    });
  });

  it('decrements and rolls under the new tab index', function() {
    var dir = -1;

    var index = 1;
    getNewPos(query, index, dir, function(newPos) {
      expect(newPos).toEqual(index - 1);
    });

    var indexRollunder = 0;
    getNewPos(query, indexRollunder, dir, function(newPos) {
      expect(newPos).toEqual(numTabs - 1);
    });
  });
});