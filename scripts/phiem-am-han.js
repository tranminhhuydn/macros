console.clear();
console.log("Phiem-Han-Han")
const editor = atom.workspace.getActiveTextEditor()


editor.insertText(phienAmHan(editor.getSelectedText()))
