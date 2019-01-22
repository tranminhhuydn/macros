console.log("test 1 1.js");
const { BrowserWindow, Tray } = require('electron')

var dir = "C:/Users/tranminhhuy/Desktop/THIEN TONG DO VAN BACH KHOA/autoimage/"
//
// const appIcon = new Tray(dir+'bai-70.JPEG')
// let win = new BrowserWindow({ icon:dir+'bai-70.JPEG' })
// console.log(appIcon, win)


function oneImage(nameImage){
  nameSave = nameImage.replace('.JPEG','')
  const nativeImage = require('electron').nativeImage
  let image = nativeImage.createFromPath(dir+nameImage)
  let size = image.getSize();

  let colums = 2;
  let rows = 1

  _width = Math.round(size.width/colums)
  _height = Math.round(size.height/rows)

  var _x_space = 600
  var _y_space = _x_space+100
  t_width = _width
  // for (var i = 0; i < colums; i++) {
  //   var _x = i*_width
  //   if(i==0){
  //     _width = _width-20-_x_space
  //     _x = _x_space
  //   }else {
  //     _width = t_width
  //     _x = i*_width
  //     _width = t_width -_y_space
  //   }
  //
  //   for (var j = 0; j < rows; j++) {
  //     var _y = j*_height
  //     let image1 = image.crop({x:_x,y:_y,width:_width,height:_height})
  //     fs.writeFileSync(dir+'HaiCot/'+nameSave+'('+i+'_'+j+').PNG',  image1.toPNG(100));
  //   }
  // }

  var j=0,i=0;
  // image 1
  var _x = i*_width
  if(i==0){
    _width = _width-_x_space
    _x = _x_space
  }else {
    _width = t_width
    _x = i*_width
    _width = t_width -_y_space
  }
  var _y = j*_height

  let imageConver = image.crop({x:_x,y:_y,width:_width,height:_height})
  //let image1 = imageConver.resize({width:_width,height:(_height*2),quality:'best'})
  let image1 = imageConver.toPNG(100)

  console.log(imageConver);

  i=1
  //image 2
  _x = i*_width
  if(i==0){
    _width = _width-_x_space
    _x = _x_space
  }else {
    _width = t_width
    _x = i*_width
    _width = t_width -_y_space
  }
  _y = j*_height

  imageConver = image.crop({x:_x,y:_y,width:_width,height:_height})
  let image2 = imageConver.toBitmap(1.0)

  let buffer1  = nativeImage.createFromBuffer(image2)

  let _url = image.createFromDataURL(dir+'HaiCot/'+nameSave+' convert.PNG')
  image1= image1.addRepresentation({scaleFactor:1.0,width:_width,height:_height,buffer:buffer1,dataURL:_url})
  fs.writeFileSync(dir+'HaiCot/'+nameSave+' convert.PNG',  image1);
}
//for (var i = 48; i < 70; i++) {
for (var i = 48; i < 49; i++) {
  oneImage('bai-'+i+'.JPEG')
}
//console.log(image)
// console.log(image1)

//var rectangle = {x:0,y:0,width:100,height:100}
// let image1 = image.crop({x:0,y:0,width:_width,height:_height})
// fs.writeFileSync(dir+'BAI 1.PNG',  image1.toPNG(100));
