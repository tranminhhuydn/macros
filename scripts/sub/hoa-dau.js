var editor = atom.workspace.getActiveTextEditor()
//console.log(editor);
var text = editor.getSelectedText()

editor.insertText(hoaDau(text))
//console.log(texts.join(" "))
//thoi đi mấy ba
