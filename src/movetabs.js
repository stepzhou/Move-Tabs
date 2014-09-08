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
      getNewPos(query, current.index, dir, function(error, newPos) {
        if (!error && !current.pinned) {
          chrome.tabs.move(current.id, {index: newPos});
        }
      });
    });
}

function getNewPos(query, index, dir, callback) {
  query({currentWindow: true}, function(tabs) {
    var error = null;
    var numTabs = tabs.length;
    var newPos = index + dir;
    if (newPos < 0) {
      newPos = numTabs - 1
    }
    if (newPos >= numTabs) {
      newPos = 0;
    }

    if (tabs[newPos].pinned) {
      newPos = getFirstUnpinnedPos(tabs, numTabs, dir);
      if (tabs[newPos].pinned) {
        error = new Error('Cannot move because all tabs are pinned');
      }
    }

    callback(error, newPos);
  });
}

function getFirstUnpinnedPos(tabs, numTabs, dir) {
  var firstUnpinnedPos = numTabs - 1;
  if (dir == 1) {
    var i;
    for (i = 0; i < numTabs && i >= 0; i++) {
      if (!tabs[i].pinned) {
        firstUnpinnedPos = i;
        break;
      }
    }
  }

  return firstUnpinnedPos;
}
