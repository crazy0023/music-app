<template>
  <div id="app" v-cloak>
    <Header></Header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
import Tab from './components/tab/Tab'

export default {
  name: 'App',
  components: {
    Header,
    Tab
  }
}
</script>

<style lang="less">
@import "./assets/less/index";
</style>
