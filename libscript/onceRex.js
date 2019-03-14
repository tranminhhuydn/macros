function onceRex(input,partten1,strReplace){
  var partten = new RegExp(partten1)
  if(partten.test(input)){
    var re = partten.exec(input)
    if(re.length>0){
      for(var j=1;j<re.length;j++){
        if(strReplace.indexOf("\\PU\\"+j)!=-1)
          strReplace = strReplace.replace("\\PU\\"+j,phienAmHanVaHoa(re[j]))
        else
        strReplace = strReplace.replace("\\"+j,re[j])
      }
      input = input.replace(re[0],strReplace)
    }
  }
  return input
}
function checkOnceRex(input,partten1,strReplace){
  var partten = new RegExp(partten1)
  if(partten.test(input)){
    var re = partten.exec(input)
    if(re.length>0){
      return re.length;
    }
  }
  return null
}
function phienAmHanVaHoa(str){
  return hoaDau(phienAmHan(str))
}
//phienAmHan()
//trong "Lăng Già Sư Tư Kí" 
