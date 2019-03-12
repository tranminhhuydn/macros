dialog = new MultiInputDialog($.div(
        {class:'quick-query-modal-message'}
      //,$(TextEditor, {ref: 'queryEditor', mini: false,showLineNumbers:false,softWrapped:true})
        ,$.button({textContent:"Add",on:{click:closei}})
      ))
function closei(){
  dialog.didClose()
}
//console.log(atom.workspace.getRightPanels());
console.log(atom.workspace.getActivePaneItem());
// dialog.attach()
//var noti = atom.notifications
//
//addRightPanel

// dialog.panel = atom.workspace.addRightPanel({
//   item: dialog
// });

//
// const notification = atom.notifications.addInfo(
//       'hello',
//       {
//         description:
//           '`atom-ide-ui` will be deactivated in favor of Nuclide.<br>' +
//           'Please disable Nuclide if you only want to use `atom-ide-ui`.',
//         dismissable: false,
//         buttons: [
//           {
//             text: 'Disable Nuclide and reload',
//             onDidClick() {
//               atom.packages.disablePackage('nuclide');
//               atom.reload();
//               notification.dismiss();
//             },
//           },
//           {
//             text: 'Disable atom-ide-ui',
//             onDidClick() {
//               atom.packages.disablePackage('atom-ide-ui');
//               notification.dismiss();
//             },
//           },
//           {
//             text: "Don't warn me again",
//             onDidClick() {
//               //atom.config.set(HIDE_WARNING_KEY, true);
//               notification.dismiss();
//             },
//           },
//         ],
//       }
//     );

// function showMessage(title,message){
//   const notification = atom.notifications.addInfo(
//         title,
//         {
//           description:
//             message,
//           dismissable: false
//         }
//       );
// }
// showMessage('Thua','Luon')
