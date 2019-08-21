<template lang='pug'>
   #personal
    .widget.personal-info
      .info-container
        .name {{ user ? user.name : '加载中' }}
        //.identity {{ user ? user.identity : '…' }}
        .identity 东南大学{{ user ? user.identity: '...'}}
      .operator-container
        .operator(@click='logout' )
          .text 退出登录
          img.icon(:src='logoutImg')
    
    .widget.applet-container
      router-link.applet(to='/intro')
        img.icon(:src='appletIntroImg')
        .text 新生指引
        img.go-icon(:src='goImg')
    

      router-link.applet.end(to='/Schedule')
        img.icon(:src='appletSchoolCalenderImg')
        .text 2019-2020 校历
        img.go-icon(:src='goImg')
 
</template>

<script>
  import api from 'zzj/api'
  import logoutImg from 'static/images/logout.png'
  import downloadImg from 'static/images/download.png'
  import goImg from 'static/images/go.png'

  import appletIntroImg from 'static/images/applet-intro.svg'
  import appletLaundryImg from 'static/images/applet-laundry.svg'
  import appletCourseStatImg from 'static/images/applet-course-stat.svg'
  import appletSchoolCalenderImg from 'static/images/applet-school-calendar.svg'
  import appletBusImg from 'static/images/applet-bus.svg'
  export default {
    props:['user','versionInfo'],
    components: {

    },
    data () {
      return {
        downloadImg,
        goImg,
        logoutImg,
        appletIntroImg,
        appletLaundryImg,
        appletCourseStatImg,
        appletSchoolCalenderImg,
        appletBusImg
      }
    },
    methods: {
      schoolCalendar(){
        window.openURL('http://jwc.seu.edu.cn/_upload/article/images/94/41/086dd9d64c838a834c2cdc0e2d11/f7150e42-c090-4b53-8d6b-f5f22044b25f.jpg', false)
        
      },
      logout() {
        window.logout()
      },
      async update() {
        console.log(this.versionInfo)
        if(window.webkit){
          if (window.versionCode < parseInt(this.versionInfo['hybrid-kernel'])) {
            window.webkit.messageHandlers.toast.postMessage({"text": '稍等一下，小猴马上回来！'})
            window.webkit.messageHandlers.clearCache.postMessage(nil)
          } 
          else {
            window.webkit.messageHandlers.toast.postMessage({"text": '已经是最新版本～'})
          }
          //window.webkit.messageHandlers.toast.postMessage({"text": '已经是最新版本～'})
          return
        }
        if(!android.getVersionCode()) {
          // Alpha版本
          android.toast('发现App新版本')
          android.openURLinBrowser(this.versionInfo.androidApk)
        }
        this.versionInfo = await api.get('/api/version')
        if (android.getVersionCode() < parseInt(this.versionInfo['android'])) {
          android.toast('发现App新版本')
          android.openURLinBrowser(this.versionInfo.androidApk)
        } else if (window.versionCode < parseInt(this.versionInfo['hybrid-kernel'])) {
          android.toast('稍等一下，小猴马上回来！')
          android.clearCache()
        } else {
          android.toast('已经是最新版本了～')
        }
        
      }
    },
    created() {
    },
    computed:{
      needUpdate(){
        try {
            if (android.getVersionCode() < parseInt(this.versionInfo['android'])) {
              return true
            }
            if (!android.getVersionCode){
              return true
            }
          } catch(e) {
            return false
          }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #personal
    width 100%
    display flex
    flex-direction column
    align-items stretch

    .personal-info
      padding 20px 15px
    .info-container
      padding 0 0 15px
      margin 0 10px
      display flex
      flex-direction row
      align-items: center

      * + *
        margin-left 10px

      .name
        font-size 17px
        flex 0 0 auto
        white-space: nowrap
        color var(--color-text-regular)

      .identity
        font-size 12px
        flex 1 1 0
        white-space: nowrap
        color var(--color-text-secondary)

        a
          margin-left 5px

      .icon
        width 20px
        height 20px
        cursor pointer

    .operator-container
      width 100%
      display: flex
      align-items center
      padding-top 15px
      border-top 0.5px solid var(--color-divider)
      
    
    .operator
      flex-grow 1
      display flex
      align-items center
      justify-content center
      
      .red-dot
        width 10px
        height 10px
        border-radius 10px
        background-color #ff6666
        margin-right 5px
      .text
        color var(--color-text-bold)
      .icon
        width 15px
        height 15px
        margin-left 5px
    
    .divider
      width 1px
      height 20px
      background-color var(--color-divider)

    .applet-container
      display flex
      flex-direction column
      align-items stretch
      padding 10px 20px

      .applet
        padding 10px 0
        border-bottom solid 1px var(--color-divider)
        display flex
        align-items center
        .text
          padding-left  10px
          flex-grow 1
        .icon
          width 25px
          height 25px
        .go-icon
          width 15px
          height 15px
      .end
        border-bottom none
      
      .applet:active
        background-color var(--color-divider)



    
</style>