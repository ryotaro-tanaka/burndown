<template>
  <div id="app">
    <Tasks/>
    <!-- <Days/> -->
    <DaysLabel/>
    <DaysMemory/>
    <Cost/>
    <Lines/>
  </div>
</template>

<script>
import Tasks from './components/Tasks.vue'
// import Days from './components/Days.vue'
import DaysLabel from './components/DaysLabal'
import DaysMemory from './components/DaysMemory'
import Cost from './components/Cost.vue'
import Lines from './components/Lines.vue'

export default {
  name: 'app',
  components: {
    Tasks,
    // Days,
    DaysLabel,
    DaysMemory,
    Cost,
    Lines
  },
  created () {
    this.$store.dispatch('setWeekly');
    this.$store.dispatch('setStartDay');
    this.$store.dispatch('setTasks');
  }
}
</script>

<style lang="scss">
@import './global.css';
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
  z-index: 6;
}
#days-label {
  z-index: 5;
}
#lines {
  z-index: 3;
}
// #days {
//   z-index: 1;
// }
#days-memory {
  z-index: 2;
}
#cost {
  z-index: 0;
}
</style>
