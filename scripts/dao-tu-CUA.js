console.clear();
var editor = atom.workspace.getActiveTextEditor()
var text = editor.getSelectedText()
text = text.split("của")
if(text.length>1)
  editor.insertText(text[1].trim()+" của "+text[0].trim())
//a của b
