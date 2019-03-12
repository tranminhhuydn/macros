console.clear();
console.log('MultiInputDialog');
const etch = this.etch;//require('etch');
//const $ = etch.dom
const {TextEditor} = require('atom');

class MultiInputDialog {
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
      this.panel.destroy();
      this.panel = null;
    }
  }
  attach() {
    this.panel = atom.workspace.addModalPanel({
      item: this
    });
  }
};
var typeList = ["Từ kép"
,"Danh Từ"
,"Động Từ"
,"Tính Từ"
,"Trạng Từ"
,"Giới Từ"
,"Phó Từ"];
const dialog = new MultiInputDialog($.div(
      {},
      $.div({ref:"keyWord",textContent:""}),
      $.div({ref:"len",textContent:""}),
      $(TextEditor, {ref: 'queryEditor', mini: true}),
      $.div({class:"form-add",ref:'typeList'

      },$.select({name: "type"})),
      $.div({class:"form-add-rex"},
        $.label({ref:"queryRex",on:{click:this.bntCheckbox}}, $.input({type:"checkbox",name:"REX"}),$.div({textContent:"Rex",class:"description"})),
      ),
      $.div({class:"form-add"},$.span({textContent:"Tự điển nào được lưu"}),$.div({ref:"categories"})),
      $.button({textContent:"Add",class:"btn",on:{click:addNew}}),//
      $.button({textContent:"Close",class:"btn",on:{click:function(){dialog.didClose()}}}),//,on:{click:dialog.didClose}
      $.button({textContent:"reconnect data",class:"btn"})
    ))
dialog.attach()
//console.log(dialog.refs);
if (dialog.refs["typeList"].children[0] == undefined) {
  var tem = $.select({
    name: "type",
    on:{change:dialog.bntRadio.bind(dialog)}
  })
  tem = etch.render(tem)
  dialog.refs["typeList"].appendChild(tem)
} else {
  var list = dialog.refs["typeList"].children[0],
    n = list.children.length
  for (var i = 0; i < n; i++) {
    list.removeChild(list.childNodes[0]);
  }
}
for (var i = 0; i < typeList.length; i++) {
  dialog.refs["typeList"].children[0].appendChild(etch.render(
    $.option({
      value: typeList[i],
      innerText: typeList[i]
    })
  ))
}
function addNew(){
  console.log(dialog.children[2].component.setText('12345'));
}
