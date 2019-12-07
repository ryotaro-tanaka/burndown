<template>
  <div id="app">
    <p>Weekly</p>
    <div v-for="week in weekly" :key="week.week_id">
      {{ `${week.week_id} : ${week.name}` }}
    </div>
    <p>StartDay -> {{ startDay }}</p>
    <p>Tasks</p>
    <div v-for="task in tasks" :key="task.task_id">
      {{`
        ${task.task_id}(${task.name}) : 
        ${task.expectations_cost} -> ${task.result_cost}
      ` }}
    </div>
    <!-- <dbtest/> -->
  </div>
</template>

<script>
// import dbtest from './components/dbtest.vue'

export default {
  name: 'app',
  components: {
    // dbtest
  },
  // data () { return{} },
  computed: {
    weekly() {
      return this.$store.state.weekly.weekly;
    },
    startDay () {
      return this.$store.getters.startDay;
    },
    tasks () {
      return this.$store.state.tasks.tasks;
    }
  },
  created () {
    this.$store.dispatch('setWeekly');
    this.$store.dispatch('setStartDay');
    this.$store.dispatch('setTasks');
  },
  // methods: {}
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
