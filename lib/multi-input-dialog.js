const etch = require('etch');
const $ = etch.dom;
module.exports = class MultiInputDialog {
  constructor(Doptions) {
    this.element = null
    this.template = Doptions
    etch.initialize(this)
    //this.element = etch.render(Doptions)
    this.builtEvent()
    this.children = this.template.children
    atom.commands.add(this.element, {
      //'core:confirm': this.confirm.bind(this),
      'core:cancel': this.didClose.bind(this),
    });
    //console.log(this.element);
  }
  builtEvent(){
    var children = this.template.children
    for (var i = 0; i < children.length; i++) {
      //console.log(children[i].tag);
       if(children[i].tag=='button')
          children[i].domNode.addEventListener('click',this.buttonEvent.bind(this,children[i].domNode))
      //   buttonEvent(children[i])
    }
  }
  buttonEvent(target){
    // console.log(this);
    // console.log(target);
  }
  update (props = {}) {

  }

  render () {
    return this.template
  }
  didClick(target){

  }
  didClose() {
    if (this.panel) {
      this.panel.hide()
      //this.panel.destroy();
      //this.panel = null;
    }
  }
  show(){
    this.panel.show()
  }
  attach(type) {
    if(type==undefined)
    {
      this.panel = atom.workspace.addModalPanel({
        item: this
      });
    }
    else if(type=='right'){
      this.panel = atom.workspace.addRightPanel({
        item: this
      });
    }else if(type=='left'){
      this.panel = atom.workspace.addLeftPanel({
        item: this
      });
    }
  }

};
