chrome.commands.onCommand.addListener(function(command) {
  var query = chrome.tabs.query;
  if (command == "move-tab-left") {
    moveTab(query, -1);
  }
  if (command == "move-tab-right") {
    moveTab(query, 1);
  }
});

function moveTab(query, dir) {
    query({currentWindow: true, active: true}, function(tabs){
      var current = tabs[0];
      getNewPos(query, current.index, dir, function(newPos) {
        chrome.tabs.move(current.id, {index: newPos});
      });
    });
}

function getNewPos(query, index, dir, callback) {
  query({currentWindow: true}, function(tabs) {
    var numTabs = tabs.length;
    var newPos = index + dir;
    if (newPos < 0) {
      newPos = numTabs - 1
    }
    if (newPos >= numTabs) {
      newPos = 0;
    }

    callback(newPos);
  });
}