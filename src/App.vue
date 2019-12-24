<template>
  <div id="app">
    <Tasks/>
    <div id="graph">
      <DaysLabel/>
      <CostLable/>
      <Lines/>
      <DaysMemory/>
      <CostMemory/>
    </div>
  </div>
</template>

<script>
import Tasks from './components/Tasks.vue'
import DaysLabel from './components/DaysLabal'
import CostLable from './components/CostLabel'
import Lines from './components/Lines.vue'
import DaysMemory from './components/DaysMemory'
import CostMemory from './components/CostMemory'

export default {
  name: 'app',
  components: {
    Tasks,
    DaysLabel,
    CostLable,
    Lines,
    DaysMemory,
    CostMemory
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
}

#graph {
  position: fixed;
  top: 0;
  // left: $tasks-width;
  left: 0;
  overflow: overlay;
  height: 100vh;
  // width: 100vw - $tasks-width;
  width: 100vw;
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

::-webkit-scrollbar{
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track{
  background: transparent;
  border: none;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb{
  background: rgba($color: gray, $alpha: 0.1);
  border-radius: 4px;
  box-shadow: none;
}
</style>
