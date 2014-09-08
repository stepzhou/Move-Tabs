describe('get moved tab\'s new position', function() {
  var query;
  var numTabs;
  var tab1, tab2;

  beforeEach(function() {
    tab1 = {pinned: false};
    tab2 = {pinned: false};
    query = jasmine.createSpy('tabs.query').and.callFake(function(args, callback) {
      var tabs = [tab1, tab2];
      numTabs = tabs.length;
      callback(tabs);
    });
  });

  it('increments and rolls over the new tab index', function() {
    var dir = 1;

    var index = 0;
    getNewPos(query, index, dir, function(error, newPos) {
      expect(newPos).toEqual(index + 1);
    });

    var indexRollover = numTabs - 1;
    getNewPos(query, indexRollover, dir, function(error, newPos) {
      expect(newPos).toEqual(0);
    });
  });

  it('decrements and rolls under the new tab index', function() {
    var dir = -1;

    var index = numTabs - 1;
    getNewPos(query, index, dir, function(error, newPos) {
      expect(newPos).toEqual(index - 1);
    });

    var indexRollunder = 0;
    getNewPos(query, indexRollunder, dir, function(error, newPos) {
      expect(newPos).toEqual(numTabs - 1);
    });
  });

  it('skips over pinned tab', function() {
    tab1.pinned = true;
    var dir;
    var index = numTabs - 1;

    dir = 1;
    getNewPos(query, index, dir, function(error, newPos) {
      expect(newPos).toEqual(1);
    });

    dir -1;
    getNewPos(query, index, dir, function(error, newPos) {
      expect(newPos).toEqual(1);
    });
  });

  it('encounters error when all tabs are pinned', function() {
    tab1.pinned = true;
    tab2.pinned = true;
    var dir = 1;
    var index = numTabs - 1;

    getNewPos(query, index, dir, function(error, newPos) {
      expect(error).not.toBe(null);
    });
  });
});