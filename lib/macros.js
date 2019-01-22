'use babel';

import MacrosView from './macros-view';
import { CompositeDisposable } from 'atom';

const path = require("path");
const fs =   require("fs");

export default {

  macrosView: null,
  modalPanel: null,
  subscriptions: null,
  activate(state) {
    this.macrosView = new MacrosView(state.macrosViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.macrosView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'macros:run': () => this.run(),
      'macros:openMacro':()=>this.openMacro(),
      'macros:updateMenu':()=>this.updateMenu()

    }));

    this.runFile('macro-load-menu.js');

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
  openMacro() {
    var pathFile = path.join(__dirname, 'macro-run.js')
    atom.open({pathsToOpen:pathFile})
  },
  runFile(Filename) {
    var self = this;
    var pathFile = path.join(__dirname, Filename)
    eval(fs.readFileSync(pathFile, 'utf8'))
  },
  updateMenu(){
    this.runFile('macro-load-menu.js')
  }
};
