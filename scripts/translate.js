console.clear();
console.log("translate")
const dataHanviet = self.listDB.hanViet
const escape = "； 、 ： 『 』 ， ？ 。 「 」 ！ 【 】 《 》 “ ” ( ) \" [ ] ' : ; > < , . ? / \\ | + = - % $ # @ ! ~ `".split(" ")

const {TextEditor} = require('atom');
// window.prompt = new MultiInputDialog($.div(
//       {class:''}//find-and-replace
//       ,$.div({textContent:"Phát Hiện Danh Từ"})
//       ,$.div({ref:"groupInput"})
//       // ,$.section({class:"input-block"},
//       //   $.span({class:"btn-group",ref: 'key',textContent:"Content: "})
//       //   ,$.div({class:"input-block-item input-block-item--flex editor-container"},$(TextEditor, {ref: 'content', mini: true}))
//       // )
//       ,$.button({textContent:"Add",class:"btn",on:{click:allEvent}})
//       ,$.button({textContent:"Close",class:"btn",on:{click:allEvent}})
//     ))

    function showMessage(title,message){
      const notification = atom.notifications.addInfo(
            title,
            {
              description:
                message,
              dismissable: false
            }
          );
    }

    function HoaDau (text){
      texts = text.split(" ")
      for (var i = 0; i < texts.length; i++) {
        texts[i]= texts[i].toLowerCase()
        f = texts[i].charAt(0).toUpperCase()
        texts[i] = f+texts[i].substr(1,texts[i].length)
      }
      return texts.join(" ")
    }

var editor = atom.workspace.getActiveTextEditor()
var input = editor.getSelectedText()
var db = this.listDB.translate.data;

//console.log(editor.getSelectedText());

//-------ADD NEW CATEGORY
// db.exec("INSERT INTO CATEGORIES (NAME,INORDER) VALUES ('Free Chinese-Vietnamese Dictionary',1)")
// var binaryArray = db.export();
// fs.writeFile(this.pathFile, binaryArray, function(err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log("The file was saved!");
// });

//---IMPORT DATA
// console.log(datatmp);
// pathFile = path.join(__dirname, 'data/tmp.txt')
// content = fs.readFileSync(pathFile, 'utf8')
// eval(content)
// // datatmp.length
// for (var i = 0; i < datatmp.length ; i++) {
//   db.exec("INSERT INTO DICTIONARY (KEY,LEN,CONTENT,TYPE,REX,CATEGORY_ID) VALUES ("
//   +"'"+datatmp[i][0]+"'"
//   +","+datatmp[i][0].length+""
//   +",'"+datatmp[i][1]+"'"
//   +",'Từ kép'"
//   +",0"
//   +",7"
//   +")"
//   )
// }
//
// var binaryArray = db.export();
// fs.writeFile(this.pathFile, binaryArray, function(err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log("The file was saved!");
// });


//console.log(db.exec("SELECT * FROM DICTIONARY where key = '"+queryEditor+"'ORDER BY LEN DESC"))
//console.log(db.exec("SELECT * FROM DICTIONARY  ORDER BY LEN DESC"))

//----------FIT KEY CHỨA DẤU ?--
//res = db.exec("SELECT * FROM DICTIONARY WHERE KEY LIKE '%?'")
// res = db.exec("SELECT * FROM DICTIONARY WHERE KEY = 'ông thấy chỗ nào'")
// if(res.length){
//   res = res[0].values
//   //console.log(res);
//   var i =0;
//   //for (var i = 0; i < res.length; i++) {
//     db.exec("UPDATE DICTIONARY SET "
//     +" KEY = '汝什麼處見'"
//     +" WHERE ID = "+res[i][0]
//     )
//   //}
// }
// var binaryArray = db.export();
// fs.writeFile(this.pathFile, binaryArray, function(err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log("The file was saved!");
// });
// res = db.exec("SELECT * FROM DICTIONARY WHERE KEY LIKE '%?'")
// console.log(res);



function translate(input){
  input = input.replace(/\'/g,"")
  try{
    var res = ""
    , key = ""
    , keys = input.split(" ")
    , outResult = ""
    input = input.replace("'","")
    .replace(/、/g,",")


    var sql = `SELECT
    "ID",
    "KEY",
    "LEN",
    group_concat(DISTINCT CONTENT),
    "TYPE",
    "REX",
    "CATEGORY_ID",
    "KEY2"
    FROM DICTIONARY
    GROUP BY key
    ORDER BY LEN DESC`
    res = db.exec(sql);//"SELECT * FROM DICTIONARY ORDER BY LEN DESC")
    if(res.length){
      res = res[0].values
      //TODO: TỐI ƯU HÓA THUẬT TOÁN cần phải băm cái text được select rồi tìm mới nhanh được
      for (var i = 0; i < res.length; i++) {
        var patt = new RegExp(res[i][1],"g")
        var strs = res[i][3].replace(new RegExp("\,","g"),"|").split("|")

        if(patt.test(input)){
            if(strs.length){
              if(this.bufferKey == undefined)
                this.bufferKey = {}
  //            console.log(res[i]);
              this.bufferKey[strs[0]] = strs
              input = input.replace(patt,strs[0]+" ")
              //TODO: marck
              // range = editor.getSelectedBufferRange()
              // marker = editor.markBufferRange(range)
              // decoration = editor.decorateMarker(marker, {type: 'line', class: 'my-line-class'})
            }
            else
            input = input.replace(patt,res[i][3]+" ")
        }
        //KEY2

        if(res[i][7].length>0){
          //console.log(res[i][7]);
          patt = new RegExp(res[i][7],"g")
          if(patt.test(input)){
              if(strs.length){
                if(this.bufferKey == undefined)
                  this.bufferKey = {}
                this.bufferKey[strs[0]] = strs
                input = input.replace(patt,strs[0]+" ")
              }
              else
              input = input.replace(patt,res[i][3]+" ")
          }
        }
      }
    }
    input = input.replace(/ \,/g,", ")
    .replace(/。/g,". ")
    .replace(/，/g,", ")
    .replace(/、/g,", ")
    .replace(/ \./g,". ")
    .replace(/ \:/g,": ")
    .replace(/ \?/g,"? ")
    .replace(/ \"/g,"\" ")
    .replace(/[《》“”]/g,"\"")
    .replace(/ \,/g,", ")


    // KỂU DỊCH TIẾNG ANH
    // for (var i = 0; i < keys.length; i++) {
    //   key = keys[i]
    //   res = db.exec("SELECT * FROM DICTIONARY WHERE KEY = '" + key +"'"
    //         //+ " AND CATEGORY_ID = "+this.refs["categories"].children[0].value+";"
    //         );
    //   //console.log(res);
    //   if(res.length){
    //     //console.log(res[0].values[0][3])
    //     outResult += res[0].values[0][3] +" "
    //   }else {
    //     outResult += key +" "
    //   }
    // }
    // if(outResult!="")
    //   editor.insertText(outResult)
  }catch(err){
    //console.log("ERR");
    //console.log(e);
    atom.notifications.addError(`Error code: ${err.message}`, {
        detail: err.detail
    });

  }
  return input;
}
var count = 0;
var _wating = false;
var collect = []
function realizeNounGeneral(cutKey,collect,fromKey){
  var find = -1
  collect.forEach(function(e,k){ if(e[0]==cutKey){find = k;}})
  if(find==-1){
      res = db.exec("SELECT * FROM DICTIONARY WHERE KEY = '" + cutKey +"' OR KEY2='" + cutKey +"'");
      if(res.length==0){
        collect.push([cutKey,fromKey])
      }
  }
  return collect
}
function realizeNoun(input){
  var
  numCut=2
  ,cutKey = ''
  ,relFind = -1
  ,listAfter = ['在','弟子']//迁在天宝
  ,listBefore = ["的","山","禅师","寺"]//清凉山,子行思山,子行山说禅师慧能
  for (var i = 0; i < listAfter.length; i++) {
    //listAfter[i]
    var t = input.split(listAfter[i])
    if(t.length>1){
      //count = t.length
      for (var j = 0; j < t.length; j++) {
        //if(j!=t.length-1)
        t[j]=listAfter[i]+t[j]
        relFind = t[j].search(listAfter[i])
        //console.log(relFind+" "+t[j]);
        if(relFind+numCut<t[j].length){
          cutKey = t[j].substr(relFind+1,numCut)
          var okEscape = true
          escape.forEach(function(v,k){
            if(cutKey.indexOf(v)!=-1)
              okEscape = false;
          })
          if(okEscape)
          collect = realizeNounGeneral(cutKey,collect,listAfter[i])
          //console.log('collectAfter'+collectAfter);
        }
      }
    }
  }
  for (var i = 0; i < listBefore.length; i++) {
    var t = input.split(listBefore[i])
    //alert(t.length)
    if(t.length>1){
      //count = t.length
      for (var j = 0; j < t.length; j++) {
        if(j!=t.length-1)
        t[j]=t[j]+listBefore[i]
        relFind = t[j].search(listBefore[i])

        //“山东寺”
        if(relFind>=numCut){
          cutKey = t[j].substr(relFind-numCut,numCut)
          var okEscape = true
          escape.forEach(function(v,k){
            if(cutKey.indexOf(v)!=-1)
              okEscape = false;
          })
          if(okEscape){
            collect = realizeNounGeneral(cutKey,collect,listBefore[i])
          }

        }
      }
    }
  }
  if(collect.length>0)
  _wating = true
  //console.log(collect);
  myAlert(collect)
  return input;
}
function myAlert (collect){
    function getOne(_char) {
      for (var i = 0; i < dataHanviet.length; i++) {
        if(dataHanviet[i][0]==_char)
        return dataHanviet[i][1]
      }
      return _char;
    }
    var inputCollect = []
    collect.forEach(function(e,k){
      var tem = $.section({class:"input-block"},
        $.div({class:"",ref: 'fromKey'+k,textContent:'Từ '+e[1]})
        ,$.div({class:"btn-group",ref: 'key'+k,textContent:e[0]})
        ,$(TextEditor,{class:"input-block-item",mini:true,mykeywork:e[0],ref:'content'+k})
      )
      inputCollect.push(tem)
    })
    window.prompt = new MultiInputDialog($.div(
          {class:''}//find-and-replace
          ,$.div({textContent:"Phát Hiện Danh Từ"})
          ,inputCollect
          ,$.button({textContent:"Add and translate",class:"btn",on:{click:allEvent}})
          ,$.button({textContent:"Continue translate",class:"btn",on:{click:allEvent}})
          ,$.button({textContent:"Close",class:"btn",on:{click:allEvent}})
        ))
    var  temp6 =window.prompt.refs
    collect.forEach(function(e,k){
      var result = ''
      var str = e[0]
      for (var j = 0; j < str.length; j++) {
        result+= getOne(str[j])+" "
      }
      result = result.trim()
      result = HoaDau(result)
      temp6['content'+k].setText(result)
    });
  if(collect.length>0)
  window.prompt.attach()
}
function allEvent(ele) {
    //console.log(ele);
    switch(ele.target.textContent){
      case "Close":window.prompt.didClose()
      break;
      case "Continue translate":
      _wating = false
      editor.insertText(translate(input))
      window.prompt.didClose()
      break;
      default:
        //console.log(window.prompt.refs.groupInput.children);
        var  temp6 =window.prompt.refs
        ,okSave = false
        collect.forEach(function(e,k){
          mykeywork = temp6['key'+k].textContent
          mycontent = temp6['content'+k].getText()
          if(mycontent!=''){
            strsql = "INSERT INTO DICTIONARY (KEY,KEY2,LEN,CONTENT,TYPE,REX,CATEGORY_ID) VALUES ('"
            + mykeywork+ "'," + "'',"+mykeywork.length + ",'" + mycontent + "','Danh Từ',0,1);";
            db.exec(strsql);
            okSave = true;
          }
        });
        if(okSave)
        savedDB()
        _wating = false
        editor.insertText(translate(input))
    }
    window.prompt.didClose()
}

function savedDB(){
  const fs =  require('fs');
  var binaryArray = db.export();
  var scriptDir = self.path.parse(__dirname)
  pathFile  = self.path.join(scriptDir.dir, 'data/translate/');

  fs.writeFile(pathFile+'data.sqlite', binaryArray, function(err) {
    if (err) {
      //console.log(err);
      console.log(err);
      atom.notifications.addError(`Error`, {
          detail: `The file was not saved`
        });
    }
    self.showMessage("Them-Tu","The file was saved")
    console.log("The file was saved!");
  });
}
//希迁于唐德宗贞尤六年(790年)//八七年
function realizeYear(input){
  var keyWord=/([一二三四五六七八九十]{1,2})年/
  if(keyWord.test(input)){
    var re = keyWord.exec(input)
    if(re.length>0){
        var getword = input.substr(re.index-2,2)
        collect = realizeNounGeneral(getword,collect)
        input = input.replace(getword, "niên hiệu "+ getword +"thứ ")
        .replace(re[0],re[1])
    }
  }
  return input
}

function onceRex(input,partten,strReplace){
  if(partten.test(input)){
    var re = partten.exec(input)
    if(re.length>0){
      for(var j=1;j<re.length;j++){
        strReplace = strReplace.replace("\\"+j,re[j])
      }
      input = input.replace(re[0],strReplace)
    }
  }
  return input
}
//东京洛阳,受到特殊的礼遇。武后命令
//thụ đáo..đích..
input = onceRex(input,/(受到)(\W{2,3})(的)(\W{2,3})。/,"được \\2\\4。")
//《》“”()""中
//《楞伽师资记》中
input = onceRex(input,/《(.*)》(中)/,"\\2\"\\1\"")
input = onceRex(input,/“(.*)”(中)/,"\\2\"\\1\"")
input = onceRex(input,/\((.*)\)(中)/,"\\2\"\\1\"")
input = onceRex(input,/\"(.*)\"(中)/,"\\2\"\\1\"")
//(764年)
input = onceRex(input,/\((\d{1,3})(年)\)/,'(\\2\\1\\)')
//“东山法门”初步具备了佛教学派哪些特征?
input = onceRex(input,/(哪些)(\W{1,4})(\?)/,"\\2gì?")

input = realizeYear(input)
input = realizeNoun(input)
if(_wating==false)
editor.insertText(translate(input))
