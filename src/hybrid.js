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

 window.getUserInfo = function() {
    if(window.userInfo){
        // token 有效则直接使用
        return window.userInfo
    } else {
        // token 无效
        console.log('无有效userInfo')
        try {
            // 调用原生层注入方法
        } catch(e) {

        }
    }
 }

 window.holdTheDog = function() {
    try{
        window.webkit.messageHandlers.heraldAppBridge.postMessage({action:'holdTheDog'})
     } catch(e) {}
 }

 window.navigateApp = function(to) {
    try{
        console.log(to)
        window.webkit.messageHandlers.heraldAppBridge.postMessage({action:'navigate',name:to.name, path:to.path})
    } catch(e) {}
 }

 window.openURL = function(url, inApp = true){
    try{
        window.webkit.messageHandlers.heraldAppBridge.postMessage({action:'openURL',inApp, url})
    } catch(e) {}
 }

 window.logout = function() {
    try{
        window.webkit.messageHandlers.heraldAppBridge.postMessage({action:'logout'})
    } catch(e) {}
 }

 window.setLocalNotification = function(title, body, timestamp, type) {
     try{
        window.webkit.messageHandlers.heraldAppBridge.postMessage({action:'setLocalNotification', title, body, timestamp, type})
     } catch(e) {}
 }

 window.clearLocalNotification = function(type) {
    try{
        window.webkit.messageHandlers.heraldAppBridge.postMessage({action:'clearLocalNotification', type})
     } catch(e) {}
 }

 //addTodayExtItems("课程", [{color:"123456", title:"操作系统", subtitle:"3-5节，教八-301", timestamp:XXX}])
 window.addTodayExtItems = function(type, items) {
     // items 包含 type、color、title、subtitle、timestamp 四个字段
     try{
        window.webkit.messageHandlers.heraldAppBridge.postMessage({action:'addTodayExtItems', type, items})
    } catch(e) {}
 }

window.clearTodayExtItems = function(type) {
    // 按照类型删除
    try{
       window.webkit.messageHandlers.heraldAppBridge.postMessage({action:'clearTodayExtItems', type, items})
   } catch(e) {}
}

window.goback = function(){
    try{
        window.webkit.messageHandlers.heraldAppBridge.postMessage({action:'goback'})
    } catch(e) {}
}
 