chrome.commands.onCommand.addListener(function(command) {
  if (command == "move-tab-left") {
    moveTab(-1);
  }
  if (command == "move-tab-right") {
    moveTab(1);
  }
});

function moveTab(dir) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      var current = tabs[0];
      getNewPos(current.index, dir, function(newPos) {
        chrome.tabs.move(current.id, {index: newPos});
      });
    });
}

function getNewPos(index, dir, callback) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
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