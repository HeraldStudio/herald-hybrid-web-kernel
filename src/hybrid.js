/**
 * Hybrid 接口
 * 
 * 此处定义所有JS与原生交互的方法
 */

 // window.token 原生层注入token

 // 从原生层获取token
window.getToken = function() {
    if(window.token){
        // token 有效则直接使用
        return window.token
    } else {
        // token 无效
        console.log('无有效token')
        try {
            // 调用原生层注入方法
        } catch(e) {

        }
    }
 }

 window.navigateApp = function(to) {
    try{
        console.log(to)
        window.webkit.messageHandlers.heraldAppBridge.postMessage({action:'navigate',name:to.name, path:to.path})
    } catch(e) {
        throw e
    }
 }