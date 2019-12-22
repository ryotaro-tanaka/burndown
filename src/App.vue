<template>
  <div id="app">
    <Tasks/>
    <DaysLabel/>
    <CostLable/>
    <Lines/>
    <DaysMemory/>
    <CostMemory/>
    <!-- <Cost/> -->
  </div>
</template>

<script>
import Tasks from './components/Tasks.vue'
import DaysLabel from './components/DaysLabal'
import CostLable from './components/CostLabel'
import Lines from './components/Lines.vue'
import DaysMemory from './components/DaysMemory'
import CostMemory from './components/CostMemory'
// import Days from './components/Days.vue'
// import Cost from './components/Cost.vue'

export default {
  name: 'app',
  components: {
    Tasks,
    DaysLabel,
    CostLable,
    Lines,
    DaysMemory,
    CostMemory
    // Cost,
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
#cost-label {
  z-index: 4;
}
#lines {
  z-index: 3;
}
#days-memory {
  z-index: 2;
}
#cost-memory {
  z-index: 1;
}
// #cost {
//   z-index: 0;
// }
</style>
