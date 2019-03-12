const path = require("path")
const fs = require("fs")
saveImagePrtScn = function(){
  var nextIndex = atom.config.get('macros.next-index');
  if (nextIndex == undefined)
    nextIndex = 0
  var fileName = atom.config.get('macros.file-name');
  if (fileName == undefined){
    fileName = 'test'
    atom.config.set("macros.file-name", fileName)
  }
  //undefined
  var dir = "C:/Users/tranminhhuy/Desktop/THIEN TONG DO VAN BACH KHOA/autoimage/"
  const {
    clipboard
  } = require('electron')
  var image = clipboard.readImage("JPEG")
  var fineName1 = dir + fileName+"-" + nextIndex + ".JPEG"
  if(fs.existsSync(fineName1)){
    fineName1 = dir + fileName+"-" + nextIndex + " copy.JPEG"
  }
  fs.writeFileSync(fineName1, image.toJPEG(100));
  nextIndex++
  atom.config.set("macros.next-index", nextIndex)
}
saveImagePrtScn();
