//import MultiInputDialog from './multi-input-dialog';
//console.clear();
//console.log("test1 multi-input-dialog")
//require ()

// atom.config.set('macros.click-run-file','dictionary.js');
// atom.config.set("macros.dblclick-run-file", 'dictionary.js')
//console.log(this.listDB);
var editor = atom.workspace.getActiveTextEditor()
var key = editor.getSelectedText().trim().replace("'","");
var resultQuery = ""
var currentHistory = null;
var history = [];
//var dialog = null;
var queryEditor = null
function dictionary(key,saveHistory){
    if(saveHistory==undefined)
      saveHistory = true;
    var sql = ""
    var partten = /[A-Ỵa-ỵ]/
    if (partten.test(key)!=true&&key.length>0){
       if(saveHistory){
         history.push(key)
         if(currentHistory==null)
          currentHistory = 0;
         else
          currentHistory++
        }
        // sql = `SELECT
        //  "KEY",
        //  "LEN",
        //  "ALIAS",
        //  group_concat(DISTINCT CONTENT),
        //  "CATEGORY_ID"
        // FROM "main"."DICTIONARY_MATCH"
        // where key = '`+key+`'
        // GROUP BY key
        // ORDER BY LEN DESC`
        // sql= "Select * from DICTIONARY_MATCH where key = '"+key+"'"
        //
        // var res = self.listDB['dataColligate'].exec(sql)
        // if(res.length){
        //   var arr = res[0].values;
        //   for (var i = 0; i < arr.length; i++) {
        //     arr[i][3] = arr[i][3].replace(arr[i][2],"")
        //   }
        //   var text1 = arr.join("\n")
        //   text1 = text1.replace(/\\n/g,"\n")
        //
        //   resultQuery = text1
        //   // 立 立春 立約 立志 。六代
        //   return true;
        // }
        for(var i in self.listDB.dictionary){
          var one = self.listDB.dictionary[i]
          //console.log(i);
          for (var j = 0; j < one.length; j++) {
            if(one[j][0] ==key||one[j][1] ==key){
              //console.log(one[j][0]+" "+key);
              resultQuery += i+"\n"
              resultQuery +=one[j].join("\n")
            }
          }
        }
        if(resultQuery!="")
        return true
    }
    return false
}
var trackPrevious = 0;
function bntPrevious(){
  var index = 0;
  if(currentHistory+trackPrevious>0){
    trackPrevious--;
    index = currentHistory+trackPrevious
    key = history[index]
    //alert(key)
    resultQuery = ""
    if(dictionary(key,false)){
      self.dictionaryView.show()
      queryEditor.setText(resultQuery);
      self.dictionaryView.refs.queryEditor.setCursorScreenPosition({row:0,column:0})
    }
  }
}
function bntTraTuDuocChon(){
   // console.log(queryEditor);
   // console.log(self.dictionaryView);
  // console.log(self);
  resultQuery = ""
  var key = queryEditor.getSelectedText()
  queryEditor.setText('Không tìm thấy!')
  if(dictionary(key)){
    //queryEditor.element.style = "overflow: scroll;height:300px;min-height:inherit"
    queryEditor.setText(resultQuery);
  }
  self.dictionaryView.show()
  self.dictionaryView.refs.queryEditor.setCursorScreenPosition({row:0,column:0})

}
function bntNext(){
  var index = 0;
  if(currentHistory+trackPrevious<history.length-1){
    trackPrevious++;
    index = currentHistory+trackPrevious
    key = history[index]
    //alert(key)
    resultQuery = ""
    if(dictionary(key,false)){
      self.dictionaryView.show()
      queryEditor.setText(resultQuery);
      self.dictionaryView.refs.queryEditor.setCursorScreenPosition({row:0,column:0})
    }
  }
}
function addNew(){
  a = queryEditor.getText();
  alert(a)
  bntClose()
}
function bntClose(){
  self.dictionaryView.didClose()
}
function bntReplace(){
  var
  myEditor = self.dictionaryView.refs.queryEditor
  ,text = myEditor.getSelectedText()
  //getText()
  .replace(/\; /g,"\|")
  .replace(/\. /g,"|")
  myEditor.setText(text)
  myEditor.selectAll()
}
function bntGoogleTranslate(){
  if(self.googleview.hide==undefined||self.googleview.hide==false){
    self.googleview.show()
    self.googleview.hide = true
    var key = queryEditor.getSelectedText()
    self.googleview.insertText(key)
  }else {
    self.googleview.didClose()
    self.googleview.hide = false
  }

}

function iniView(){
  //self.dictionaryView = undefined
  if(self.dictionaryView == undefined){
    const {TextEditor} = require('atom');
    self.dictionaryView = new MultiInputDialog($.div(
          {}
          ,$.button({textContent:"Close",class:"btn",on:{click:bntClose}})

          ,$(TextEditor, {ref: 'queryEditor', mini: false,showLineNumbers:false,softWrapped:true})
          //,$.button({textContent:"Add",class:"btn",on:{click:addNew}})
          ,$.button({textContent:"|<",class:"btn",on:{click:bntPrevious}})
          ,$.button({textContent:"Tra Từ được chọn",class:"btn",on:{click:bntTraTuDuocChon}})
          ,$.button({textContent:">|",class:"btn",on:{click:bntNext}})
          ,$.button({textContent:"replace ;",class:"btn",on:{click:bntReplace}})
          ,$.button({textContent:"Google Translate",class:"btn",on:{click:bntGoogleTranslate}})

        ))
    self.dictionaryView.attach('right')
  }
}
//this.dictionaryView = undefined
var condition = dictionary(key);
if(condition){
//if(this.dictionaryView == undefined|| condition){

  iniView()

  queryEditor = self.dictionaryView.refs.queryEditor
  queryEditor.setText('Không tìm thấy!')
  //石头希迁的禅
  queryEditor.element.style = "overflow: scroll;height:90%";//300px;min-height:inherit"
  //self.dictionaryView.element.style = "overflow: scroll;-webkit-box-orient: horizontal;resize:horizontal"
  queryEditor.scrollToCursorPosition()
  queryEditor.setText(resultQuery);
  self.dictionaryView.show()

  //console.log(self.dictionaryView.refs.queryEditor);
  queryEditor.setCursorScreenPosition({row:0,column:0})
  queryEditor.initialScrollLeftColumn = queryEditor.getScrollLeftColumn()
  queryEditor.initialScrollTopRow = queryEditor.getScrollTopRow()
}
