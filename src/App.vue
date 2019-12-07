<template>
  <div id="app">
    <div>{{ count }}</div>
    <input type="button" @click="addCount()" value="add count">
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
  data: function() {
    return {
    }
  },
  computed: {
    count() {
      return this.$store.state.weekly.count;
    }
  },
  methods: {
    addCount() {
      this.$store.dispatch('addCount',{num:3});
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
