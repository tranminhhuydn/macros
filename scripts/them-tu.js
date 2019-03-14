//import MultiInputDialog from './multi-input-dialog';
console.clear();
console.log("them tu 1")
//require ()
//self.loadLibScript()
const {TextEditor} = require('atom');
const fs =  require('fs');
const SelectListView = require('atom-select-list');
// const MultiInputDialog = require('./multi-input-dialog');

// atom.config.set('macros.click-run-file','dictionary.js');
// atom.config.set("macros.dblclick-run-file", 'dictionary.js')
//console.log(this.listDB);
var editor = atom.workspace.getActiveTextEditor()
  ,key = editor.getSelectedText().trim().replace("'","")
  ,resultQuery = ""
  ,db = this.listDB.translate.data
  ,dataMauCau = self.listDB.setting.data.mauCau
  ,idMauCau = -1
  function returnListMauCauOnceColumn(){
    var tmp = []
    for (var i = 0; i < dataMauCau.length; i++) {
      tmp.push(dataMauCau[i][0])
    }
    return tmp;
  }
  function checkDataMauCau(){
    for (var i = 0; i < dataMauCau.length; i++) {
      if(dataMauCau[i][0]==form.Rex.getText())
      return i;
    }
    return -1;
  };
  function saveSetting(){
    var conent = JSON.stringify(self.listDB.setting)
    ,scriptDir = self.path.parse(__dirname)
    pathFile  = self.path.join(scriptDir.dir, 'data/');
    fs.writeFile(pathFile+'setting.json', conent, function(err) {
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
var formBuferId = 0
,formRex = null
,rebuilt = 0



//if(this.themTuView ==undefined || rebuilt){
  var templateThemTu = $.div({ref:"tabTừ"}
    // ,$.div({ref:'cotrollerTabTừ',class:'btn-group'}
    //   ,$.button({class:"btn selected",on:{click:bntTabTừ}},'Form Từ')
    //   ,$.button({class:"btn",on:{click:bntTabTừ}},'CSDL Từ')
    // )
    ,$.h1({},"Thêm Từ")
    ,$.div({ref:"formFormTừ"}
      ,$.div({ref:"keyWord",textContent:key})
      ,$.section({class:"input-block"},
        $.div({class:"block",style:'line-height: 2.75;font-size: 10pt;'},"Key2: "
          ,$.button({class:"badge btn",on:{click:allEventThemTu}},'简')
          ,$.button({class:"badge btn",on:{click:allEventThemTu}},'繁')
        )
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
      ,$.div({class:'block'}
        ,$.button({textContent:"Add",class:"btn",on:{click:addNew}})
        ,$.button({textContent:"Delete",class:"btn",on:{click:bntDelete}})
      )
    )
    // ,$.div({ref:'formCSDLTừ',style:{display:'none'}}
    //   ,$.div({},'CSDL')
    //   ,$.div({class:'block'}
    //     ,$.button({class:"btn",on:{click:allEventThemTu}},"|<")
    //     ,$.button({class:"btn",on:{click:allEventThemTu}},">|")
    //   )
    // )
  )
  function allEventThemTu(ele){
    var b = ele.target.textContent
    switch (b) {
      case '简':
          form.key2.setText(gianPhon(form.keyWord.textContent,'简'))
          break;
      case '繁':
          form.key2.setText(gianPhon(form.keyWord.textContent,'繁'))
          break;
      default:

    }
  }
  var templateThemMauCau = $.div({ref:"tabMẫuCâu",style:{display:'none'}}
    ,$.h1({},"Thêm Mẫu Câu")
    ,$.div({ref:'cotrollerTabMẫuCâu',class:'btn-group'}
      ,$.button({class:"btn selected",ref:'crtTabFMauCau',on:{click:bntTabMẫuCâu}},'Form Mẫu Câu')
      ,$.button({class:"btn",ref:'crtTabCSDL',on:{click:bntTabMẫuCâu}},'CSDL Mẫu Câu')
    )

    ,$.div({ref:"formFormMẫuCâu"}
      ,$.section({class:"input-block"},
        $.div({class:"block-group",style:'line-height: 2.75;font-size: 10pt;'},"Rex: "
          ,$.button({class:"badge btn",on:{click:allEventThemMauCau}},'Số T')
          ,$.button({class:"badge btn",on:{click:allEventThemMauCau}},'Số')
          ,$.button({class:"badge btn",on:{click:allEventThemMauCau}},'Chữ')
          ,$.button({class:"badge btn",on:{click:allEventThemMauCau}},'Bắt chữ()')
          ,$.button({class:"badge btn",on:{click:allEventThemMauCau}},'Không ở trong')
          ,$.button({class:"badge btn",on:{click:allEventThemMauCau}},'Bất cứ')
        )
        ,$.div({class:"input-block-item input-block-item--flex editor-container"},$(TextEditor, {ref: 'Rex', mini: true}))
      )
      ,$.section({class:"input-block"},
        $.div({class:"btn-group",style:'line-height: 2.75;font-size: 10pt;',textContent:"Thây thế: "})
        ,$.div({class:"input-block-item input-block-item--flex editor-container"},$(TextEditor, {ref: 'Replace', mini: true}))
      )
      ,$.section({class:"input-block"},
        $.div({class:"btn-group",style:'line-height: 2.75;font-size: 10pt;',textContent:"Ví dụ: "})
        ,$.div({class:"input-block-item input-block-item--flex editor-container"},$(TextEditor, {ref: 'Example', mini: true}))
      )
      ,$.section({class:"input-block"}
        ,$.span({},"Trước khi dịch ")
        ,$.input({type:'radio',ref:'beforeTranslate',name:'beforeTranslate',checked:true})
        ,$.span({}," Sau khi dịch ")
        ,$.input({type:'radio',ref:'affterTranslate',name:'beforeTranslate'})
      )
      ,$.div({ref:'resultTestThemMauCau'},"két quả kiểm tra")
      ,$.div({class:'block'}
        ,$.button({class:"btn",on:{click:allEventThemMauCau}},"Thêm")
        ,$.button({class:"btn",on:{click:allEventThemMauCau}},"Kiểm tra trước khi Thêm")
        ,$.button({class:"btn",on:{click:allEventThemMauCau}},"Xóa")
      )
    )
    ,$.div({ref:'formCSDLMẫuCâu',style:{display:'none'}}
      ,$.div({},'CSDL')
      ,$(SelectListView,{
        ref:'listCSDLMẫuCâu',
        items: returnListMauCauOnceColumn(),//['one', 'two', 'three'],
        elementForItem: (item) => {
          const li = document.createElement('li')
          li.textContent = item
          return li
        },
        didConfirmSelection: (item) => {
          //console.log(form)
          //bntTabMẫuCâu(form.crtTabFMauCau)
          //console.log('confirmed', item)

          form.crtTabFMauCau.click()
          updateFormMauCau(item)
        },
        didCancelSelection: () => {
          console.log('cancelled')
        }
      })
      ,$.div({class:'block'}
        ,$.button({class:"btn",on:{click:allEventThemMauCau}},"|<")
        ,$.button({class:"btn",on:{click:allEventThemMauCau}},">|")
      )
    )
  )
  function allEventThemMauCau(ele){
    function replaceOnce(ob,strReplace){
      var t = ob.getSelectedText()
      ,t1 = ob.getText()
      t1 = t1.replace(t,strReplace)
      ob.setText(t1)
    };
    var b = ele.target.textContent

    switch (b) {
      case 'Thêm':
        var len = checkOnceRex(form.Example.getText(),form.Rex.getText(),form.Replace.getText())
        idMauCau = checkDataMauCau()
        console.log(len,idMauCau);
        if(idMauCau ==-1 && len !=null){//add new
          dataMauCau.push([form.Rex.getText(),form.Replace.getText(),form.Example.getText(),form.beforeTranslate.checked,len])
          saveSetting()
        }else if(idMauCau>-1 && len !=null) {//edit
          dataMauCau[idMauCau] = [form.Rex.getText(),form.Replace.getText(),form.Example.getText(),form.beforeTranslate.checked,len]
          //(受到)(\W{2})(的)(\W{2})
          //受到特殊的礼遇
          saveSetting()
        }
        self.themTuView.didClose()
        break;
      case 'Kiểm tra trước khi Thêm':
        form.resultTestThemMauCau.textContent=onceRex(form.Example.getText(),form.Rex.getText(),form.Replace.getText())
        break;
      case 'Xóa':
        idMauCau = checkDataMauCau()
        if(idMauCau !=-1){
          dataMauCau[idMauCau] = dataMauCau.slice(0,idMauCau).concat(dataMauCau.slice(idMauCau+1,dataMauCau.length))
          saveSetting()
        }
        self.themTuView.didClose()
        break
      case 'Số T':
          replaceOnce(form.Rex,"([一二三四五六七八九十百萬万億]{1,4})")
          break
      case 'Số':
        replaceOnce(form.Rex,"(\\d{1,4})")
        break;
      case 'Chữ':
        replaceOnce(form.Rex,"(\\W{2})")
        break;
      case 'Bắt chữ()':
        var
        ob = form.Rex
        ,t = ob.getSelectedText()
        ,t1 = ob.getText()
        t1 = t1.replace(t,"("+t+")")
        ob.setText(t1)
        break;
      case 'Không ở trong':
        replaceOnce(form.Rex,"([^]+)")
        break;
      case 'Bất cứ':
        replaceOnce(form.Rex,"(.*)")
        break;
      default:

    }
  }
  var templateThemPhatHienDanhTu = $.div({ref:"tabPhátHiệnDanhTừ",style:{display:'none'}}
    ,$.div({ref:'cotrollerTabPhátHiệnDanhTừ',class:'btn-group'}
      ,$.button({class:"btn selected",on:{click:bntTabPhátHiệnDanhTừ}},'Form Phát Hiện Danh Từ')
      ,$.button({class:"btn",on:{click:bntTabPhátHiệnDanhTừ}},'CSDL Phát Hiện Danh Từ')
    )
    ,$.div({ref:"formFormPhátHiệnDanhTừ"}
      ,'formFormPhátHiệnDanhTừ'
      ,$.div({class:'block'}
        ,$.button({textContent:"Add",class:"btn",on:{click:allEventThemPhatHienDanhTu}})
        ,$.button({textContent:"Delete",class:"btn",on:{click:allEventThemPhatHienDanhTu}})
      )
    )
    ,$.div({ref:'formCSDLPhátHiệnDanhTừ',style:{display:'none'}}
      ,$.div({},'CSDL')
      ,$.div({class:'block'}
        ,$.button({class:"btn",on:{click:allEventThemPhatHienDanhTu}},"|<")
        ,$.button({class:"btn",on:{click:allEventThemPhatHienDanhTu}},">|")
      )
    )
  )
  function allEventThemPhatHienDanhTu(ele){
    var b = ele.target.textContent
  }
  this.themTuView = new MultiInputDialog(
    $.div(
        {class:'styleguide pane-item'}
        ,$.div({ref:'cotrollerTab',class:'btn-group'}
          ,$.button({class:"btn selected",on:{click:bntTab}},'Từ')
          ,$.button({class:"btn",on:{click:bntTab}},'Mẫu Câu')
          ,$.button({class:"btn",on:{click:bntTab}},'Phát Hiện Danh Từ')
          ,$.button({class:"btn",on:{click:bntClose}},"Close")
        )
        ,templateThemTu//end form them tu
        ,templateThemMauCau
        ,templateThemPhatHienDanhTu
      )
    )
  self.themTuView.attach()
//}
  var form = self.themTuView.refs
  var queryEditor = self.themTuView.refs.content
  queryEditor.setText('Không tìm thấy!')
  queryEditor.setText(resultQuery);
  //formRex = 0
  function bntTab(ele){
    var b = ele.target.textContent
    ,c= 'tab'+b.replace(/\s/g,"")
    ,tabs = ['Từ',"Mẫu Câu","Phát Hiện Danh Từ"];
    bntTabOne(ele,tabs,'tab',form.cotrollerTab)
    if(c=='tabMẫuCâu')
    updateFormMauCau()
  }

  function bntTabMẫuCâu(ele){
    var tabs = ['Form Mẫu Câu',"CSDL Mẫu Câu"];
    bntTabOne(ele,tabs,'form',form.cotrollerTabMẫuCâu)
    updateFormMauCau()
  }
  function bntTabPhátHiệnDanhTừ(ele){
    var tabs = ['Form Phát Hiện Danh Từ',"CSDL Phát Hiện Danh Từ"];
    bntTabOne(ele,tabs,'form',form.cotrollerTabPhátHiệnDanhTừ)
  }
  function bntTabTừ(ele){
    var tabs = ['Form Từ',"CSDL Từ"];
    bntTabOne(ele,tabs,'form',form.cotrollerTabTừ)
  }
  function bntTabOne(ele,tabs,key,parent){
    var b = ele.target.textContent
    ,c= key+b.replace(/\s/g,"")

    //console.log(self.themTuView.refs);
    for (var i = 0; i < tabs.length; i++) {
      var t = tabs[i].replace(/\s/g,"")
      form[key+t].style ='display:none'
    }
    //parent = form.cotrollerTabTừ
    for (var i = 0; i < parent.children.length; i++) {
      parent.children[i].className = 'btn'
    }
    var s = ele.target.className.trim()
    ele.target.className=(s=='btn')?'btn selected':'btn';
    form[c].style ='display:block'
  }
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
  function updateFormMauCau(edit){
    // form mau cau
    form.Rex.setText(editor.getSelectedText())
    form.Example.setText(editor.getSelectedText())

    form.listCSDLMẫuCâu.refs.queryEditor.setText(editor.getSelectedText())

    if(edit!=undefined)
      form.Rex.setText(edit)
    idMauCau = checkDataMauCau();
    if(idMauCau !=-1){
      form.Rex.setText(dataMauCau[idMauCau][0])
      form.Replace.setText(dataMauCau[idMauCau][1])
      form.Example.setText(dataMauCau[idMauCau][2])
      if(dataMauCau[idMauCau][3])
        form.beforeTranslate.checked = dataMauCau[idMauCau][3]
      else
        form.affterTranslate.checked = true
    }
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
