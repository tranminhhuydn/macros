function phienAmHan(str){
  var dataHanviet = self.listDB.hanViet.data
  ,result = ''
  function getOne(_char) {
    for (var i = 0; i < dataHanviet.length; i++) {
      if(dataHanviet[i][0]==_char)
      return dataHanviet[i][1]
    }
    return _char;
  }
  for (var j = 0; j < str.length; j++) {
    result+= getOne(str[j])+" "
  }
  return result;
}
