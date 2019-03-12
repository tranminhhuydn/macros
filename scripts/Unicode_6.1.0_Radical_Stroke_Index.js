console.clear();
console.log("Unicode_6.1.0_Radical_Stroke_Index.js")
const SelectList = require('atom-select-list');
const dataHanviet = this.listDB.boFull
//console.log(dataHanviet);

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
    // bntClose()
    // editor.insertText(encoding.name)
    conFirmSelection(encoding)
  },
  didCancelSelection: () => {
    //this.cancel()
  }
})
usersSelectList.element.classList.add('typing-han-viet-view')
dialog = new MultiInputDialog($.div(
      {}
      ,$.button({textContent:"1",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"2",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"3",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"4",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"5",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"6",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"7",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"8",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"9",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"10",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"11",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"12",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"13",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"14",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"15",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"16",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.button({textContent:"17",class:"btn",on:{click:bntTraBoSoNetClick}})
      ,$.div({ref:'selectList'})
      ,$.button({textContent:"Close",class:"btn",on:{click:allEvent}})
    ))
dialog.refs.selectList.append(usersSelectList.element)
function bntTraBoSoNetClick(ele){
  //console.log(ele);
  const listItems = []
  var data = dataHanviet.bo;
  for (let id in data[ele.toElement.textContent]) {
    listItems.push({id, name: data[ele.toElement.textContent][id]})
  }
  usersSelectList.update({items: listItems})
}
function conFirmSelection(encoding){
  var vname = encoding.name.split(" ")
  var vname2 = encoding.name.split("\t")
  testTraChu = vname
  if(vname.length>=4)
  {
    const listItems = []
    var data = self.nodeData = dataHanviet[vname[1]]
    for (let id in data) {
      listItems.push({id, name: id})
    }
    usersSelectList.update({items: listItems})
  }else if(vname.length==3){
    if(vname[1]=="➞"){
      // //console.log(myLS);
      var datacheckIn = ["⼀ 1 One 5","⼁ 2 Line 5","⼂ 3 Dot 5","⼃ 4 Slash 5","⼄ 5 Second 5","⼅ 6 Hook 6","⼆ 7 Two 6","⼇ 8 Lid 6","⼈ 9 Man 6","⼉ 10 Legs 10","⼊ 11 Enter 10","⼋ 12 Eight 11","⼌ 13 Down Box 11","⼍ 14 Cover 11","⼎ 15 Ice 11","⼏ 16 Table 12","⼐ 17 Open Box 12","⼑ 18 Knife 12","⼒ 19 Power 14","⼓ 20 Wrap 15","⼔ 21 Spoon 15","⼕ 22 Right Open Box 15","峷 23 Hiding Enclosure 15","峸 24 Ten 15","峹 25 Divination 16","峺 26 Seal 16","峻 27 Cliff 16","峼 28 Private 17","峽 29 Again 17","峾 30 Mouth 18","峿 31 Enclosure 24","崀 32 Earth 24","崁 33 Scholar 27","崂 34 Go 28","崃 35 Go Slowly 28","崄 36 Evening 28","崅 37 Big 28","崆 38 Woman 29","崇 39 Child 32","崈 40 Roof 33","崉 41 Inch 34","崊 42 Small 34","崋 43 Lame 35","崌 44 Corpse 35","崍 45 Sprout 36","崎 46 Mountain 36","崏 47 River 39","崐 48 Work 39","崑 49 Oneself 39","崒 50 Turban 39","崓 51 Dry 41","崔 52 Short Thread 41","崕 53 Dotted Cliff 41","崖 54 Long Stride 42","崗 55 Two Hands 42","崘 56 Shoot 43","崙 57 Bow 43","崚 58 Snout 43","崛 59 Bristle 44","崜 60 Step 44","崝 61 Heart 45","崞 62 Halberd 49","崟 63 Door 50","崠 64 Hand 50","崡 65 Branch 55","崢 66 Rap 55","崣 67 Script 56","崤 68 Dipper 56","崥 69 Axe 56","崦 70 Square 57","崧 71 Not 57","崨 72 Sun 57","崩 73 Say 59","崪 74 Moon 60","崫 75 Tree 60","崬 76 Lack 66","崭 77 Stop 67","崮 78 Death 67","崯 79 Weapon 68","崰 80 Do Not 68","崱 81 Compare 69","崲 82 Fur 69","崳 83 Clan 70","崴 84 Steam 70","崵 85 Water 70","崶 86 Fire 76","崷 87 Claw 80","崸 88 Father 80","崹 89 Double X 80","崺 90 Half Tree Trunk 80","崻 91 Slice 80","崼 92 Fang 81","崽 93 Cow 81","崾 94 Dog 82","崿 95 Profound 84","嵀 96 Jade 84","嵁 97 Melon 86","嵂 98 Tile 86","嵃 99 Sweet 87","嵄 100 Life 87","⽤ 101 Use 87","⽥ 102 Field 87","⽦ 103 Bolt Of Cloth 88","⽧ 104 Sickness 89","⽨ 105 Dotted Tent 90","⽩ 106 White 91","⽪ 107 Skin 91","⽫ 108 Dish 91","⽬ 109 Eye 92","⽭ 110 Spear 95","⽮ 111 Arrow 95","⽯ 112 Stone 95","⽰ 113 Spirit 97","⽱ 114 Track 99","⽲ 115 Grain 99","⽳ 116 Cave 101","⽴ 117 Stand 102","⽵ 118 Bamboo 102","⽶ 119 Rice 106","⽷ 120 Silk 107","⽸ 121 Jar 110","⽹ 122 Net 111","⽺ 123 Sheep 111","⽻ 124 Feather 112","⽼ 125 Old 113","⽽ 126 And 113","⽾ 127 Plow 113","⽿ 128 Ear 113","⾀ 129 Brush 114","⾁ 130 Meat 114","⾂ 131 Minister 117","⾃ 132 Self 117","⾄ 133 Arrive 118","⾅ 134 Mortar 118","⾆ 135 Tongue 118","⾇ 136 Oppose 118","⾈ 137 Boat 118","⾉ 138 Stopping 119","⾊ 139 Color 119","⾋ 140 Grass 119","⾌ 141 Tiger 126","⾍ 142 Insect 127","⾎ 143 Blood 130","⾏ 144 Walk Enclosure 131","⾐ 145 Clothes 131","⾑ 146 West 133","⾒ 147 See 133","⾓ 148 Horn 134","⾔ 149 Speech 134","⾕ 150 Valley 137","⾖ 151 Bean 138","⾗ 152 Pig 138","⾘ 153 Badger 139","⾙ 154 Shell 139","⾚ 155 Red 140","⾛ 156 Run 141","⾜ 157 Foot 142","⾝ 158 Body 144","⾞ 159 Cart 144","⾟ 160 Bitter 146","⾠ 161 Morning 146","⾡ 162 Walk 146","⾢ 163 City 148","⾣ 164 Wine 150","⾤ 165 Distinguish 151","⾥ 166 Village 151","⾦ 167 Gold 151","⾧ 168 Long 155","⾨ 169 Gate 156","⾩ 170 Mound 157","⾪ 171 Slave 158","⾫ 172 Short Tailed Bird 159","⾬ 173 Rain 159","⾭ 174 Blue 161","⾮ 175 Wrong 161","⾯ 176 Face 161","⾰ 177 Leather 161","⾱ 178 Tanned Leather 162","⾲ 179 Leek 163","⾳ 180 Sound 163","⾴ 181 Leaf 163","⾵ 182 Wind 164","⾶ 183 Fly 165","⾷ 184 Eat 165","⾸ 185 Head 167","⾹ 186 Fragrant 167","⾺ 187 Horse 167","⾻ 188 Bone 169","⾼ 189 Tall 170","⾽ 190 Hair 170","⾾ 191 Fight 171","⾿ 192 Sacrificial Wine 171","⿀ 193 Cauldron 171","⿁ 194 Ghost 172","⿂ 195 Fish 172","⿃ 196 Bird 175","⿄ 197 Salt 178","⿅ 198 Deer 178","⿆ 199 Wheat 178","⿇ 200 Hemp 179","⿈ 201 Yellow 179","⿉ 202 Millet 179","⿊ 203 Black 180","⿋ 204 Embroidery 180","⿌ 205 Frog 180","⿍ 206 Tripod 180","⿎ 207 Drum 181","⿏ 208 Rat 181","⿐ 209 Nose 181","⿑ 210 Even 181","⿒ 211 Tooth 181","⿓ 212 Dragon 182","⿔ 213 Turtle 182","⿕ 214 Flute 182"]
      var ok = false;
      for(var i=0;i<datacheckIn.length;i++){
        var tmp = datacheckIn[i].split(" ")
        if(tmp.length>=4 && vname[2]==tmp[0] ){
          const listItems = []
          var data = self.nodeData = dataHanviet[tmp[1]]
          for (let id in data) {
            listItems.push({id, name: id})
          }
          ok = true;
          usersSelectList.update({items: listItems})
        }
      }
      if(!ok)
      alert("không có")
    }
  }else if(vname2.length==2){
    atom.workspace.getActiveTextEditor().insertText(vname2[0])
    bntClose()
  }
  else {
    //console.log(this.nodeData);
    const listItems = []
    var data = self.nodeData[encoding.name];
    for (let id in data) {
      listItems.push({id, name: data[id]})
    }
    usersSelectList.update({items: listItems})
  }
}
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
    for (var j=0; j < strs1.length; j++) {

      if(strs1[j].trim()==str.trim()){
        collects[collects.length] = data[i][0]
      }
    };
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