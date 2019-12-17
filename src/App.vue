<template>
  <div id="app">
    <!-- <Tasks/>
    <Days/>
    <Cost/> -->
  </div>
</template>

<script>
// import Tasks from './components/Tasks.vue'
// import Days from './components/Days.vue'
// import Cost from './components/Cost.vue'

export default {
  name: 'app',
  components: {
    // Tasks,
    // Days,
    // Cost
  },
  created () {
    this.$store.dispatch('setWeekly');
    this.$store.dispatch('setStartDay');
    this.$store.dispatch('setTasks');
  }
}
</script>

<style lang="scss" >
@import './global.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}

#tasks {
  z-index: 1;
}
</style>
