'use babel';

import MacrosView from './macros-view';
import {Disposable, CompositeDisposable } from 'atom';
const sql3 = require("sql.js")
const etch = require('etch');
const path = require("path");
const fs =  require("fs");

const MultiInputDialog = require('./multi-input-dialog');

export default {
  etch:etch,
  dom:etch.dom,
  SQL:SQL,
  path:path,
  listDB:{},

  listItemEventClick:[],
  listItemEventDBClick:[],
  macrosView: null,
  modalPanel: null,
  subscriptions: null,

  config: {
    'click-run-file': {
      title: 'click-run-file',
      description: 'Specify file dictionary.js (e.g. `dictionary.js`)',
      type: 'string',
      default: 'dictionary.js'
    },
    'dblclick-run-file':{
      title: 'dblclick-run-file',
      description: 'Specify file dictionary.js (e.g. `dictionary.js`)',
      type: 'string',
      default: 'dictionary.js'
    }
  },

  activate(state) {
    this.watchedEditors = new WeakSet()

    this.macrosView = new MacrosView(state.macrosViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.macrosView.getElement(),
      visible: false
    });
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.connectData();

    var self = this
    this.runFile('macro-load-menu.js');
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'macros:run': () => this.run(),
      'macros:openMacro':()=>this.openMacro(),
      'macros:updateMenu':()=>this.updateMenu()
    }));

    this.subscriptions.add(atom.workspace.observeTextEditors((editor) => {
      const disposable = this.watchEditor(editor, ['workspace-center'])
      editor.onDidDestroy(() => disposable.dispose())
    }))

  },
  watchEditor (editor, labels) {
      if (this.watchedEditors.has(editor)) return

      let view = atom.views.getView(editor)

      if (view.hasFocus()) {
        this.updateCurrentEditor(editor, labels)
      }

      let clickListener = (element) => this.eventClick()
      view.addEventListener('click', clickListener)
      //
      let dblclickListener = (element) => this.eventBblclick()
      view.addEventListener('dblclick', dblclickListener)

      let disposable = new Disposable(() => {
        //view.removeEventListener('double-click', blurListener)
        view.removeEventListener('click', clickListener)
        view.removeEventListener('dblclick', dblclickListener)
        if (this.editor === editor) {
          this.updateCurrentEditor(null)
        }
      })

      this.watchedEditors.add(editor)
      this.subscriptions.add(disposable)
      return new Disposable(() => {
        disposable.dispose()
        if (this.subscriptions != null) {
          this.subscriptions.remove(disposable)
        }
        this.watchedEditors.delete(editor)
      })
  },
  connectData (){
    pathFile  = this.path.join(__dirname, 'data/');
    //pathFile  = pathFile.replace('macros','translater-dictionary')
    listFile = ['data'];
    var scriptDir = this.path.parse(__dirname)
    var dirTranslate = path.join(scriptDir.dir, 'data/translate')
    var dataTranslate = fs.readdirSync(dirTranslate)
    this.listDB.translate={}
    for (var i = 0; i < dataTranslate.length; i++) {
      var _name = dataTranslate[i]
      var keyName = _name.replace(/\s/g,"_").replace(".sqlite","")
      this.listDB.translate[keyName] = new this.SQL.Database(fs.readFileSync( path.join(dirTranslate,_name)));
    }

    // for (var i = 0; i < listFile.length; i++) {
    //   pathFileName  = this.path.join(pathFile,listFile[i]+'.sqlite')
    //   //var filebuffer = fs.readFileSync(pathFileName);
    //   this.listDB[listFile[i]] =  new this.SQL.Database(fs.readFileSync(pathFileName));
    // }

    // listFileJson = ['hanViet','hanNom']
    // for (var i = 0; i < listFileJson.length; i++) {
    //   this.listDB[listFileJson[i]] =  require('../data/'+listFileJson[i]+'.json');
    // }

    var rootDir = path.join(scriptDir.dir, 'data/')
    var dataRoot = []
    dataRoot = fs.readdirSync(rootDir)
    for (var i = 0; i < dataRoot.length; i++) {
      var _name = dataRoot[i]
      if(_name =="App.json")
      continue;
      if(_name.indexOf(".json")!=-1){
        //console.log(_name);
        var keyName = _name.replace(/\s/g,"_").replace(".json","")
        this.listDB[keyName]=  require("../data/"+_name).data;
      }
    }


    scriptDir = path.join(scriptDir.dir, 'data/dictionary')
    var dataDir = []
    dataDir = fs.readdirSync(scriptDir)
    this.listDB.dictionary = {}
    for (var i = 0; i < dataDir.length; i++) {
      var _name = dataDir[i]
      if(_name =="App.json")
      continue;
      var keyName = _name.replace(/\s/g,"_").replace(".json","")
      //console.log(keyName+"=>"+_name);
      if(keyName.indexOf(".js")==-1)
      this.listDB.dictionary[keyName]=  require("../data/dictionary/"+_name).data;
    }
  },
  updateCurrentEditor(editor, labels){
    // this.typingHanViet.typingMore()
    // this.typingHanNom.typingMore()
    // this.translaterDictionaryView.dbclick(editor)
  },
  eventClick(){
    var fileName = atom.config.get('macros.click-run-file').trim();
    if (fileName!= undefined && fileName.indexOf('.js')!=-1){
      this.runScript(fileName,false)
    }
  },
  eventBblclick(){
    //console.log('eventBblclick');
    var fileName = atom.config.get('macros.dblclick-run-file');
    if (fileName!= undefined && fileName.indexOf('.js') != -1){
      this.runScript(fileName,false)
    }
  },
  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.macrosView.destroy();
  },

  serialize() {
    return {
      macrosViewState: this.macrosView.serialize()
    };
  },

  run() {

    this.runFile('macro-run.js')
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  },
  saveRun(fileName){
    var pathFile = path.join(__dirname, 'macro-run.js')
    var content = "console.clear();\n"
    content +="console.log(\""+fileName+"\")\n";
    content +="//run script with host key crt+alr+r\n"
    content +="this.runScript('"+fileName+"');\n"
    fs.writeFileSync(pathFile,content,"utf8")
  },
  openMacro() {
    var pathFile = path.join(__dirname, 'macro-run.js')
    atom.open({pathsToOpen:pathFile})
  },

  //runFile(Filename,[run])
  //runFile({Filename:"test.js"},[run]) that mean pathFile from root package
  runFile(Filename,run) {
    var self = this;
    var pathFile = ""
    if(typeof(Filename)==='object'){
      var c1 = path.parse(__dirname);
      pathFile = path.join(c1.dir, Filename.Filename)
    }else{
      pathFile = path.join(__dirname, Filename)
    }
    if(run==undefined)
      run = true;
    if(run){
      eval(fs.readFileSync(pathFile, 'utf8'))
    }
    else
      return fs.readFileSync(pathFile, 'utf8')
  },
  runScript(Filename,save) {
    if(save==undefined){
      save = true;
    }

    const $ = etch.dom;
    var self = this;
    var pathFile = path.parse(__dirname);
    pathFile = path.join(pathFile.dir, "scripts/"+Filename)
    eval(fs.readFileSync(pathFile, 'utf8'))
    // var name = path.parse(pathFile)
    // if(name.base!='macro-run.js')
    if(save)
     this.saveRun(Filename)
  },
  updateMenu(){
    this.runFile('macro-update-menu.js')
  },
  showMessage(title,message){
    const notification = atom.notifications.addInfo(
          title,
          {
            description:
              message,
            dismissable: false
          }
        );
  }
};
