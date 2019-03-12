console.log("test 1 1.js");
const { BrowserWindow, Tray } = require('electron')

var dir = "C:/Users/tranminhhuy/Desktop/THIEN TONG DO VAN BACH KHOA/test/"
//
// const appIcon = new Tray(dir+'bai-70.JPEG')
// let win = new BrowserWindow({ icon:dir+'bai-70.JPEG' })
// console.log(appIcon, win)

const nativeImage = require('electron').nativeImage
let image = nativeImage.createFromPath(dir+'BAI 1.jpg')
let size = image.getSize();

let colums = 7;
let rows = 10

_width = Math.round(size.width/colums)
_height = Math.round(size.height/rows)



for (var i = 0; i < colums; i++) {
  var _x = i*_width
  for (var j = 0; j < rows; j++) {
    var _y = j*_height
    let image1 = image.crop({x:_x,y:_y,width:_width,height:_height})
    fs.writeFileSync(dir+'BAI 1 ('+i+'_'+j+').PNG',  image1.toPNG(100));
  }
}
//console.log(image)
// console.log(image1)

//var rectangle = {x:0,y:0,width:100,height:100}
// let image1 = image.crop({x:0,y:0,width:_width,height:_height})
// fs.writeFileSync(dir+'BAI 1.PNG',  image1.toPNG(100));
