<template>
    <div id="tasks">
        <p>Tasks</p>
        <table>
            <tbody>
                <tr v-for="task in tasks" :key="task.task_id">
                    <th>
                        {{ task.task_id }}
                    </th>
                    <th>
                        <input type="text" :value="task.name"
                        @blur="">
                    </th>
                    <td class="exp">
                        {{ task.exp_cost }}
                    </td>
                    <td class="result" :class="{notComplete: !task.is_completed}">
                        {{ task.result_cost }}
                    </td>
                    <td class="result" :class="{notComplete: !task.is_completed}">
                        {{ task.result_year }}
                    </td>
                    <td class="result" :class="{notComplete: !task.is_completed}">
                        {{ task.result_month }}
                    </td>
                    <td class="result" :class="{notComplete: !task.is_completed}">
                        {{ task.result_day }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    computed: {
        tasks () {
            return this.$store.state.tasks.tasks; 
        }
    },
    methods: {
        updateTasks () {
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../global.scss';

#tasks {
    position: fixed;
    top: 0;
    left: 0;
    width: $tasks-width;
    height: 100vh;
    border-right: medium solid black;
}

table{
  width: 100%;
  border-spacing: 0;
  tr {
      th {
        border-bottom: thin solid gainsboro;
        padding: 10px 0;

      }
      .exp {
        border-bottom: thin solid green;
        text-align: center;
        padding: 10px 0;
      }
      .result {
        border-bottom: thin solid orange;
        text-align: center;
        padding: 10px 0;
      }
      .notComplete {
          color: silver;
      }
  }
}
</style>