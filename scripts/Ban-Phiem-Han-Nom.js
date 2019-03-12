console.clear();
console.log("Ban-Phiem-Han-Nom.js")
const SelectList = require('atom-select-list');
const dataHanviet =this.listDB.hanNom
//console.log(dataHanviet);
//nhân hoa nắm tay nhất tam không hai
const editor = atom.workspace.getActiveTextEditor()

const usersSelectList = new SelectList({
  className:"td-select-list",
  initiallyVisibleItemCount:10,
  itemsClassList: ['mark-active'],
  items: [],
  filterKeyForItem: (encoding) => encoding.name,
  elementForItem: (encoding) => {
    const element = document.createElement('li')
    if (encoding.id === this.currentEncoding) {
      element.classList.add('active')
    }
    element.textContent = encoding.name
    element.dataset.encoding = encoding.id
    return element
  },
  didConfirmSelection: (encoding) => {
    bntClose()
    editor.insertText(encoding.name)
  },
  didCancelSelection: () => {
    //this.cancel()
  }
})
usersSelectList.element.classList.add('typing-han-viet-view')
dialog = new MultiInputDialog($.div(
      {}
      ,$.div({ref:'selectList'})
      ,$.button({textContent:"Close",class:"btn",on:{click:allEvent}})
    ))
dialog.refs.selectList.append(usersSelectList.element)
function allEvent(ele){
  bntClose()
}
function bntClose(){
  dialog.didClose()
  dialog.element.remove()
}
function typingOnceChar (str)
{
  var strs;
  var collects = Array();
  var data = dataHanviet;
  for (var i=0; i < data.length; i++) {
    var strs1 = data[i][1].split(",")
    if(data[i][0]==str.trim()){
      //console.log(data[i][0]+"=="+str.trim());
      //collects.concat(strs1)
      for (var j=0; j < strs1.length; j++) {
        collects.push(strs1[j])
      }
    }
  };
  return collects;
}
//nhân

const encodingItems = []
const str = editor.getSelectedText()
const collects = typingOnceChar(str.toLowerCase())


for (let id in collects) {
  encodingItems.push({id, name: collects[id]})
}
usersSelectList.update({items: encodingItems})
dialog.attach();
