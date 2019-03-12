console.clear();
console.log("Phiem-Han-Han")
const dataHanviet =this.listDB.hanViet
const editor = atom.workspace.getActiveTextEditor()
console.log(this.listDB);
//
const str = editor.getSelectedText()
function getOne(_char) {
  for (var i = 0; i < dataHanviet.length; i++) {
    if(dataHanviet[i][0]==_char)
    return dataHanviet[i][1]
  }
  return _char;
}
var result = ''
for (var j = 0; j < str.length; j++) {
  result+= getOne(str[j])+" "
}
editor.insertText(result.trim())
