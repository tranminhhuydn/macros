const path = require("path")
const fs = require("fs")
var scriptDir = path.parse(__dirname)
scriptDir = path.join(scriptDir.dir, 'scripts')
var MmenuDefault = null
var menuDefault = {
  "menu": [{
    "label": "Macros",
    "submenu": [{
        "label": "Run",
        "command": "macros:run"
      },
      {
        "label": "Open macro",
        "command": "macros:openMacro"
      },
      {
        "label": "Update Menu",
        "command": "macros:updateMenu"
      },
      {
        "type": "separator"
      }
    ]
  }]
}
var oldMenu = [],dataDir = [],listMenu = [],err1,items2;
  //dataDir
  function fnDir (items) {
    dataDir = items;
  }
  dataDir = fs.readdirSync(scriptDir)
  //console.log("dataDir "+dataDir);
  //listMenu
  menuDefault.menu[0].submenu.forEach(function(e2, i2) {
    if (typeof(e2.label) != "undefined")
      listMenu.push(e2.label)
  });



//removeMenu();

var globalFile = listMenu.join(" ")

c3 = "package=" + self.runFile({
  Filename: "package.json"
}, false)
eval(c3)
saveMenuAndActivationCommands()
console.log(globalFile);
  //add
  for (var i = 0; i < dataDir.length; i++) {
    var _name = dataDir[i]
    if (globalFile.indexOf(_name) == -1) {
      if(_name.indexOf(".js")!=-1)
        addNewCommandAndMenu(_name)
      else
        addSubmenu(_name)
    }
  }
function addSubmenu(name){
  var subDir = scriptDir+"/"+name
  var subDataDir = fs.readdirSync(subDir)
  var submenu1  =[]
  for (var i = 0; i < subDataDir.length; i++) {
    var _command = "macros:"+subDataDir[i]
    submenu1.push({label:subDataDir[i],command:_command})

    var obj = {}
    obj[_command] = function(_this, fileName1) {
      return function(event, element) {
        self.runScript(fileName1);
      }
    }(this, name+"/"+subDataDir[i])

    self.subscriptions.add(atom.commands.add('atom-workspace', obj));


  }
  atom.menu.add([{
    label: 'Macros',
    submenu: [{
      label: name,
      submenu: submenu1
    }]
  }]);

  menuDefault.menu[0].submenu.push({
    label: name,
    submenu: submenu1
  })
  menuDefault.menu[0].submenu.push({
    "type": "separator"
  })
  saveMenuAndActivationCommands()
}
function addNewCommandAndMenu(__name) {
  if (typeof(__name) == "undefined")
    return;
  var nameMacro = "macros:" + __name
  var obj = {}
  obj[nameMacro] = function(_this, fileName1) {
    return function(event, element) {
      self.runScript(fileName1);
    }
  }(this, __name)

  self.subscriptions.add(atom.commands.add('atom-workspace', obj));

  atom.menu.add([{
    label: 'Macros',
    submenu: [{
      label: __name,
      command: nameMacro
    }]
  }]);

  menuDefault.menu[0].submenu.push({
    label: __name,
    command: "macros:" + __name
  })
  //save file
  saveMenuAndActivationCommands()
}

function saveMenuAndActivationCommands() {
  var dir1 = path.parse(__dirname)
  pathFile = path.join(dir1.dir, "menus/macros.json")
  fs.writeFileSync(pathFile, JSON.stringify(menuDefault), "utf8")

  //update package.json activationCommands "atom-workspace"
  var activationCommands = []
  menuDefault.menu[0].submenu.forEach(function(i) {
    if (i.command != undefined)
      activationCommands[activationCommands.length] = i.command
    if(i.submenu!= undefined)
      i.submenu.forEach(function(j) {
          if (j.command != undefined)
          activationCommands[activationCommands.length] = j.command
      })
  })
  package.activationCommands["atom-workspace"] = activationCommands
  pathFile = path.join(dir1.dir, "package.json")
  fs.writeFileSync(pathFile, JSON.stringify(package), "utf8")
}
//console.log(saveMenuAndActivationCommands);

atom.menu.update()
