import fetchJsonp from 'fetch-jsonp';
function deepClone(obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
      if(typeof obj !== 'object'){
          return;
      } else if(window.JSON){
          str = JSON.stringify(obj), //序列化对象
          newobj = JSON.parse(str); //还原
      } else {
          for(var i in obj){
             newobj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]; 
         }
     }
     return newobj;
}

function getDomain(){
    // var mDomain = document.domain.indexOf("dianping.com")==-1 ? '//e.51ping.com' : '//e.dianping.com';
    var mDomain = '//e.51ping.com';
    return mDomain;
}

function getGDomain(){
    // var gDomain = document.domain.indexOf("51ping.com")==-1? '//g.dianping.com':'//g.51ping.com';
    var gDomain = '//g.51ping.com';
    return gDomain;
}

function getEDomain(){
    // var eDomain = document.domain.indexOf("51ping.com")==-1? 'https://e.dianping.com'+'?redir='+location.href:'https://e.51ping.com'+'?redir='+location.href;
    var eDomain = 'https://e.51ping.com'+'?redir=';
    return eDomain;
}

function ajaxFun(ajaxUrl){
  return new Promise((resolve)=>{
    fetchJsonp(ajaxUrl, {
        jsonpCallback: 'jsonp',
        withCredentials: true
    })
    .then(function(response) {
        return response.json();
    }).then((json)=>{
        if(json.code!=200){
            alert('获取信息失败:'+json.msg);
            console.log('获取信息失败', json.msg);
            return
        }
        resolve(json);
    }).catch(function(ex) {
        alert('请求错误');
        console.log(ex);
    });
  });
}

module.exports = {
    deepClone:deepClone,
    getDomain:getDomain,
    getGDomain:getGDomain,
    getEDomain:getEDomain,
    ajaxFun:ajaxFun
};