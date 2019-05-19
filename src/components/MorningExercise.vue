<template lang="pug">
  
  .widget.pe(v-if='pe.count' :class='{}' @click="navigate")
    .widget-title 
     img(:src='logo')
     .text 跑操助手
    .widget-line
    .content
      .content-item
        .number {{pe.count}}
        .text 已跑天数
      .content-item
        .number {{pe.remainDays}}
        .text 预计可跑天数
      .content-item
        .number {{45 - pe.count}}
        .text 剩余天数
    .widget-line(v-if="pe.hint")
    .hint(v-if="pe.hint") {{pe.hint}}
    .widget-line
    .widget-hint 
        .text 点击卡片查看跑操打卡记录和最近体测结果
        .arrow ›
      

</template>
<script>

  import api from '@/api'
  import formatter from '@/util/formatter'
  import logo from 'static/images/componentLogo/morningExercise.svg'

  export default {
    data(){
      return {
        pe:{},
        logo
      }
    },
    persist: {
      pe: 'herald-default-pe'
    },
    created() {
      this.reload()
    },
    methods: {
      ...formatter,
      async reload() {
        this.pe = await api.get('/api/pe')
        console.log(this.pe)
      },
      navigate(){
        this.$router.push('/pe')
      }
    }
  }

</script>

<style lang="less">
  
  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0px 10px;
    .content-item {
    display: flex;
    flex-grow: 0;
    flex-direction: column;
    align-items: center;
    .text{
      color:#888888;
    }
    .number{
      font-size: 30px;
      color:#FF8585;
    }
    }
  }

  

</style>

