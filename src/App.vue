<template>
  <div id="app">
    <Tasks/>
    <Days/>

    <!-- <input type="button" value="update" @click="updateResult()">
    <input type="button" value="insert" @click="insertTask()">
    <input type="button" value="delete" @click="deleteTask()"> -->
  </div>
</template>

<script>
import Tasks from './components/Tasks.vue'
import Days from './components/Days.vue'

export default {
  name: 'app',
  components: {
    Tasks,
    Days
  },
  // data () { return{} },
  computed: {
    // weekly() {
    //   return this.$store.state.weekly.weekly;
    // },
    // startDay () {
    //   return this.$store.getters.startDay;
    // },
    tasks () {
      return this.$store.state.tasks.tasks;
    }
  },
  created () {
    this.$store.dispatch('setWeekly');
    this.$store.dispatch('setStartDay');
    this.$store.dispatch('setTasks');
  },
  methods: {
    // updateResult() {
    //   this.$store.dispatch('updateResult', {task_id:2, result_cost:20});
    // },
    // insertTask () {
    //   this.$store.dispatch('insertTask', {task_id:4, name:'work-test', expectationsCost:20});
    // },
    // deleteTask () {
    //   this.$store.dispatch('deleteTask', {task_id:4});
    // }
  }
}
</script>

<style lang="scss" >
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
</style>
