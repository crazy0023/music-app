<template>
  <div id="app">
    <Header></Header>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="less">
@import "./assets/less/index";
</style>
