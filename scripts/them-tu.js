//import MultiInputDialog from './multi-input-dialog';
console.clear();
console.log("them tu 1")
//require ()
const {TextEditor} = require('atom');
// const MultiInputDialog = require('./multi-input-dialog');

// atom.config.set('macros.click-run-file','dictionary.js');
// atom.config.set("macros.dblclick-run-file", 'dictionary.js')
//console.log(this.listDB);
var editor = atom.workspace.getActiveTextEditor()
var key = editor.getSelectedText().trim().replace("'","");
var resultQuery = ""
var db = this.listDB.translate.data;

var formBuferId = 0
,formRex = null
,rebuilt = 0



//if(this.themTuView ==undefined || rebuilt){
  this.themTuView = new MultiInputDialog($.div(
        {class:'find-and-replace'}
        ,$.div({ref:"keyWord",textContent:key})
        ,$.section({class:"input-block"},
          $.div({textContent:"Key2: ",class:"btn-group",style:'line-height: 2.75;font-size: 10pt;'})
          ,$.div({class:"input-block-item input-block-item--flex editor-container"},$(TextEditor, {ref: 'key2', mini: true}))
        )
        ,$.section({class:"input-block"},
          $.div({class:"btn-group",style:'line-height: 2.75;font-size: 10pt;',textContent:"Content: "})
          ,$.div({class:"input-block-item input-block-item--flex editor-container"},$(TextEditor, {ref: 'content', mini: true}))
        )
        ,$.div({class:"form-add",ref:'typeList'})
        ,$.div({class:"form-add-rex"},
          $.span({textContent:"Rex ",class:"header-item description"})
          ,$.input({type:"checkbox",ref:"queryRex",name:"REX",on:{click:bntCheckbox}})
        )
        ,$.section({class:"input-block"}
          ,$.div({textContent:"Tự điển nào được lưu",class:"btn-group"})
          ,$.div({ref:"categories",class:"btn-group",style:'width: 50%;'})
        )
        ,$.button({textContent:"Add",class:"btn",on:{click:addNew}})
        ,$.button({textContent:"Delete",class:"btn",on:{click:bntDelete}})
        ,$.button({textContent:"Close",class:"btn",on:{click:bntClose}})

      ))
  self.themTuView.attach()
//}
  var queryEditor = self.themTuView.refs.content
  queryEditor.setText('Không tìm thấy!')
  queryEditor.setText(resultQuery);
  //formRex = 0

  function bntDelete(){
    var
    key = self.themTuView.refs.keyWord.textContent
  //  ,key2 =  self.themTuView.refs.key2.getText()
    ,len = key.length
    ,content =  self.themTuView.refs.content.getText()
    ,type = self.themTuView.refs.typeList.children[0].value
    ,fromData =  self.themTuView.refs.categories.children[0].value

    strsql = "Delete FROM DICTIONARY where KEY='" + key+ "' "
    //+" AND KEY2='"+KEY2+"'"
    +" AND TYPE='"+type+"'"
    +" AND LEN="+len
    +" AND CATEGORY_ID="+fromData
    // alert(strsql)
    db.exec(strsql);
    savedDB()
    bntClose()
  }
  function addNew(){
    var queryEditor = self.themTuView.refs.content.getText()
    var len = queryEditor.length
    key = self.themTuView.refs.keyWord.textContent
    var res = ""
    res = db.exec("SELECT * FROM DICTIONARY WHERE KEY = '" + key+ "' AND CATEGORY_ID = "+self.themTuView.refs.categories.children[0].value+";");
    if(res.length)
    console.log(res[0].values[0]);
    //--------
    //add new
    //--------
    if (res.length == 0) {
      console.log('add new');
      var pattan = /[A-Ỹa-ỹ0-9]/
      if(editor.getSelectedText()!="" && pattan.test(editor.getSelectedText())== false){
        strsql = "INSERT INTO DICTIONARY (KEY,KEY2,LEN,CONTENT,TYPE,REX,CATEGORY_ID) VALUES ('" + key+ "'," + "'" + self.themTuView.refs.key2.getText()+ "',"+key.length + ",'" + queryEditor + "','" + self.themTuView.refs.typeList.children[0].value + "'," + formRex + "," + self.themTuView.refs.categories.children[0].value + ");";
        db.exec(strsql);
        savedDB()
      }else {
        //alert("data no save !")
        //self.showMessage("Error","data no save!")
        atom.notifications.addError(`Error`, {
            detail: 'data no save!'
          });
        console.log("data no save !");
      }
    }
    //--------
    // update
    //--------
    else if(formBuferId!=0) {
      console.log('update');
       db.exec("UPDATE DICTIONARY SET"+
       " CONTENT = '"+queryEditor+"'"+
       " ,TYPE = '"+ self.themTuView.refs.typeList.children[0].value  +"'"+
       " ,KEY2 = '"+ self.themTuView.refs.key2.getText() +"'"+
       " ,REX = "+formRex+
       " ,CATEGORY_ID = "+self.themTuView.refs.categories.children[0].value+
       " WHERE ID = "+formBuferId+";")
       savedDB()
       //console.log("ok update now");
    }
    bntClose()
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
  function bntClose(){
    self.themTuView.didClose()
    //self.themTuView.element.remove()
  }
  function bntCheckbox(ele){
    //formRex = 0
    //console.log(ele.target.checked);
    //self.themTuView.refs.queryRex.checked
    if(ele.target.checked){
      formRex = 1;
    }else {
      formRex = 0;
    }
  }
  function bntTypeList(ele){
    //console.log(ele.target.value);
    // console.log(ele.target);
    // console.log(self.themTuView.refs.typeList.children[0].value);
  }
  function bntRadioCaterory(ele){
    //this.form["CATEGORY_ID"] = ele.target.value
    // console.log(ele.target.value);
  }

  function updateForm(){
    //console.log(self.themTuView);
    self.themTuView.refs.key2.setText('')
    self.themTuView.refs.content.setText('')
    self.themTuView.refs.keyWord.textContent = key
    var typeList = ["Từ kép"
    ,"Danh Từ"
    ,"Động Từ"
    ,"Tính Từ"
    ,"Trạng Từ"
    ,"Giới Từ"
    ,"Phó Từ"];
    if (self.themTuView.refs["typeList"].children[0] == undefined) {
      var tem = $.select({
        name: "type",
        on:{change:bntTypeList}
      })
      tem = etch.render(tem)
      self.themTuView.refs["typeList"].appendChild(tem)
    } else {
      var list = self.themTuView.refs["typeList"].children[0],
        n = list.children.length
      for (var i = 0; i < n; i++) {
        list.removeChild(list.childNodes[0]);
      }
    }
    for (var i = 0; i < typeList.length; i++) {
      self.themTuView.refs["typeList"].children[0].appendChild(etch.render(
        $.option({
          value: typeList[i],
          innerText: typeList[i]
        })
      ))
    }

    //-------------------
    //-select data base
    //-------------------
    var res = db.exec("SELECT * FROM CATEGORIES");

    if (self.themTuView.refs.categories.children[0] == undefined) {
      var tem = $.select({
        name: "CATEGORY_ID",
        on:{change:bntRadioCaterory}
      })
      tem = etch.render(tem)
      self.themTuView.refs.categories.appendChild(tem)
    } else {
      var list = self.themTuView.refs.categories.children[0],
        n = list.children.length
      for (var i = 0; i < n; i++) {
        list.removeChild(list.childNodes[0]);
      }
    }
    for (var i = 0; i < res[0].values.length; i++) {
      self.themTuView.refs.categories.children[0].appendChild(etch.render(
        $.option({
          value: res[0].values[i][0],
          innerText: res[0].values[i][1]
        })
      ))
    }

    //self.themTuView.refs.categories.children[0].value = self.themTuView.form["CATEGORY_ID"];

    //------------------------------
    //update field whend had database
    //--------------------------------
    //bntRadioCaterory
    var keyWord =  self.themTuView.refs["keyWord"].textContent
    ,resKey = db.exec("SELECT * FROM DICTIONARY WHERE KEY ='"+keyWord+"' or KEY2='"+keyWord+"'")

    if(resKey.length>0){
      //console.log(resKey[0].values[0]);
      //console.log(self.themTuView);
      resKey = resKey[0].values[0]
      self.themTuView.refs.keyWord.textContent=resKey[1]
      self.themTuView.refs.content.setText(resKey[3])
      self.themTuView.refs.key2.setText(resKey[7])
      self.themTuView.refs.typeList.children[0].value = resKey[4]
      //console.log(resKey[4]);
      if(resKey[5]){
        self.themTuView.refs.queryRex.children[0].checked = true
      }
      //console.log(self.themTuView.refs);
      self.themTuView.refs.categories.children[0].value =resKey[6];
      self.themTuView.refs.categories.children[0].disabled = true;
      formBuferId = resKey[0]
    }else{
      self.themTuView.refs.categories.children[0].disabled = false;
    }

    if(self.themTuView.refs.queryRex.checked){
      formRex = 1;
    }else {
      formRex = 0;
    }
  }

  self.themTuView.show();
  updateForm();
