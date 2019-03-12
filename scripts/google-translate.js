//alert("alert sub.js")
const {TextEditor} = require('atom');
const editor = atom.workspace.getActiveTextEditor()
var rebuilt = false;
if(this.googleview ==undefined || rebuilt){
  this.googleview = new MultiInputDialog($.div(
        {}
        ,$.button({textContent:"Tra từ được chọn",class:"btn",on:{click:AllEvent}})
        ,$.button({textContent:"Close",class:"btn",on:{click:AllEvent}})
        ,$.div({ref:"subspace"})
        // ,$.button({textContent:"Add",class:"btn",on:{click:AllEvent}})
      ))
      const webview = this.webview = document.createElement('webview');
      webview.setAttribute('nodeintegration', true);
      webview.addEventListener('dom-ready', () => {
        webview.insertCSS(`
          #gt-promo-lr,
          #gt-ft-res {
            display: none !important
          }
        `);
        webview.executeJavaScript(`
          'use strict';
          const ipcRenderer = require('electron').ipcRenderer;
          const source = document.getElementById('source');
          source.addEventListener('blur', () => {
            ipcRenderer.send('blur');
          });
          ipcRenderer.on('focus', () => {
            source.focus();
          });
        `);
      });
        // if (!this.loaded) {
        //   this.loaded = true;
        //   //this.insertText();
        // }

      const lang = 'en';//atom.config.get('translater-dictionary.lang');
      webview.src = `https://translate.google.co.jp/?hl=${lang}`;
      webview.className = [
        'atom-google-translate-modal-view__view',
        'native-key-bindings'
      ].join(' ');
      this.googleview.refs.subspace.appendChild(webview);
      this.googleview.attach('right')
}

function AllEvent(ele){
   switch (ele.toElement.textContent) {
     case "Close":
       self.googleview.didClose()
       break;
     case "Tra từ được chọn":
       self.googleview.insertText()
       break;
     default:

   }

}
this.googleview.insertText = function(input) {
  if (editor && input ==undefined) {
    const selection = editor.getSelectedText()
    self.webview.executeJavaScript(`
      document.getElementById('source').value = '${selection}';
    `);
  }else if(input !=undefined){
    self.webview.executeJavaScript(`
      document.getElementById('source').value = '${input}';
    `);
  }
}
//this.googleview.getTitle= 'google translate';
//}

this.googleview.show()
this.googleview.insertText()

 uri = `https://translate.google.co.jp/?hl=en`
// atom.workspace.open({uri:uri})

// paneItem = atom.workspace.getActivePaneItem()
// filePath = paneItem.getPath()
// atom.workspace.open(uri)

// atom.workspace.open().then(function(editor){
//       //  atom.document.createElement('webview')
//          atom.textEditors.setGrammarOverride(editor, 'alert.js')
//          editor.insertText('text')
// })
// const webview = this.webview = document.createElement('webview');
//  atom.workspace.open(uri,webview)

//https://glosbe.com/zh/vi/%E8%91%97%E8%A1%8C
