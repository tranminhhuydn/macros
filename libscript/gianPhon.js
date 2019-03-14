function gianPhon(resultConvert,key){
  var dataGianPhon = self.listDB.gianPhonThe;
  for (var i = 0; i < dataGianPhon.length; i++) {
    for (var j = 0; j < resultConvert.length; j++) {
        if(key=='简' && resultConvert[j] == dataGianPhon[i][1]){
          resultConvert = resultConvert.replace(resultConvert[j],dataGianPhon[i][0])
        }else if(key=='繁' && resultConvert[j] == dataGianPhon[i][0]){
          resultConvert = resultConvert.replace(resultConvert[j],dataGianPhon[i][1])
        }
    }
  }
  return resultConvert
}
