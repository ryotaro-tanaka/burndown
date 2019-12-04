<template>
  <div id="app">
    <Days :width="width"/>
    <dbtest/>
  </div>
</template>

<script>
import Days from './components/Days.vue'
import dbtest from './components/dbtest.vue'

export default {
  name: 'app',
  components: {
    Days,
    dbtest
  },
  data: function() {
    return {
      width: 48
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
