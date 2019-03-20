<template lang="pug">
  
  .widget-group
    .widget.srtp(:class='{}' @click="navigateGpa")
        .widget-title 
            img(:src='gpaLogo')
            .text 成绩查询
        .widget-line
        .content
            .content-item
                .gpa-number {{gpa.gpa}}
                .text 当前GPA
        .widget-line
        .widget-hint 
            .text 详细成绩与绩点估算
            .arrow ›

    .widget.srtp( :class='{}' @click="navigateSrtp")
        .widget-title 
            img(:src='srtpLogo')
            .text SRTP
        .widget-line
        .content
            .content-item
                .srtp-number {{srtp.info.points}}
                .text 当前SRTP得分
        .widget-line
        .widget-hint 
            .text SRTP成绩详情
            .arrow ›
      

</template>
<script>

  import api from '@/api'
  import formatter from '@/util/formatter'
  import gpaLogo from 'static/images/componentLogo/gpaLogo.svg'
  import srtpLogo from 'static/images/componentLogo/srtpLogo.svg'

  export default {
    data(){
      return {
        srtp:null,
        gpa:null,
        gpaLogo,
        srtpLogo
      }
    },
    persist: {
      gpa: 'herald-default-gpa',
      srtp: 'herald-default-srtp',
    },
    created() {
      this.reload()
    },
    methods: {
      ...formatter,
      async reload() {
        this.gpa = await api.get('/api/gpa')
        this.srtp = await api.get('/api/srtp')
        console.log(this.gpa)
        console.log(this.srtp)
      },
      navigateSrtp(){
        this.$router.push('/srtp')
      },
      navigateGpa(){
        this.$router.push('/grade')
      }
    }
  }

</script>

<style lang="less" scoped>
  
  .content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0px 10px;
    .content-item {
    display: flex;
    flex-grow: 0;
    flex-direction: column;
    align-items: center;
    .text{
      color:#888888;
    }
    .srtp-number{
      font-size: 30px;
      color:#9B51E0;
    }
    .gpa-number{
      font-size: 30px;
      color:#27AE60;
    }
    }
  }

</style>

