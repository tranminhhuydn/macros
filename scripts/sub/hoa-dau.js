var editor = atom.workspace.getActiveTextEditor()
//console.log(editor);
var text = editor.getSelectedText()
var texts = text.split(" ")
//Tung Sơn Nghĩa Phúc, tung sơn kính hiền, trường an lam sơn phổ tịch, lam điền ngọc sơn tuệ phúc
for (var i = 0; i < texts.length; i++) {
  texts[i]= texts[i].toLowerCase()
  f = texts[i].charAt(0).toUpperCase()
  texts[i] = f+texts[i].substr(1,texts[i].length)
  //console.log(f+texts[i]);
}
editor.insertText(texts.join(" "))
//console.log(texts.join(" "))
