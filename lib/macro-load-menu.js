const path = require("path")
const fs = require("fs")
var globalFile = "macro-run.js macros-view.js macros.js macro-update-menu.js macro-load-menu.js"
//update globalFile
atom.menu.template.forEach(function(e,i){
  if(e.label=='Macros'){
    e.submenu.forEach(function(e1,i1){
        globalFile +=" "+e1.label
    })
  }
});


fs.readdir(__dirname, function(err, items) {
  for (var i = 0; i < items.length; i++) {
    if (globalFile.indexOf(items[i]) == -1) {
      var nameMacro = "macros:" + items[i]
      var obj = {}
      obj[nameMacro] = function(_this, fileName1) {
        return function(event, element) {
          self.runFile(fileName1);
          //console.log(event, element, fileName1);
        }
      }(this, items[i])
      self.subscriptions.add(atom.commands.add('atom-workspace', obj));
      atom.menu.add([{
        label: 'Macros',
        submenu: [{
          label: items[i],
          command: nameMacro
        }]
      }]);
    }
  }
});
