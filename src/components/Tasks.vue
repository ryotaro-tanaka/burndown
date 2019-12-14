<template>
    <div id="tasks">
        <p>Tasks</p>
        <div>
            <input type="button" value="add"
            @click="insertTask()">
            <input type="button" value="delete"
            @click="deleteTask()">
            <input type="button" value="  ↑  "
            @click="updateTaskId(1)">
            <input type="button" value="  ↓  "
            @click="updateTaskId(-1)">
        </div>
        <table>
            <tbody>
                <tr v-for="task in tasks" :key="task.task_id" :id="task.task_id"
                :class="{target: targetTaskId === task.task_id}"
                @click="changeTarget(task.task_id)">
                    <th>
                        {{ task.task_id }}
                    </th>
                    <th>
                        <input type="text" class="task-name"
                        :value="task.name"
                        @change="updateTaskValues(task.task_id)">
                    </th>
                    <td class="exp">
                        <input type="number" class="exp-cost"
                        :value="task.exp_cost"
                        @change="updateTaskValues(task.task_id)">
                    </td>
                    <td class="result" :class="{notComplete: !task.is_completed}">
                        <input type="number" class="result-cost"
                        :value="task.result_cost"
                        @change="updateTaskValues(task.task_id)">
                    </td>
                    <td class="result" :class="{notComplete: !task.is_completed}">
                        <input type="number" class="result-year"
                        :value="task.result_year"
                        @change="updateTaskValues(task.task_id)">
                    </td>
                    <td class="result" :class="{notComplete: !task.is_completed}">
                        <input type="number" class="result-month"
                        :value="task.result_month"
                        @change="updateTaskValues(task.task_id)">
                    </td>
                    <td class="result" :class="{notComplete: !task.is_completed}">
                        <input type="number" class="result-day"
                        :value="task.result_day"
                        @change="updateTaskValues(task.task_id)">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            targetTaskId: 0
        }
    },
    computed: {
        tasks () {
            return this.$store.state.tasks.tasks; 
        },
        targetTask () {
            const tr = document.getElementById(this.targetTaskId);
            if(tr === null) return undefined;
            return {
                taskId: this.targetTaskId,
                name: tr.getElementsByClassName('task-name')[0].value,
                expCost: tr.getElementsByClassName('exp-cost')[0].value,
                resultCost: tr.getElementsByClassName('result-cost')[0].value,
                resultYear: tr.getElementsByClassName('result-year')[0].value,
                resultMonth: tr.getElementsByClassName('result-month')[0].value,
                resultDay: tr.getElementsByClassName('result-day')[0].value
            }
        }
    },
    methods: {
        changeTarget(id) {
            this.targetTaskId = -1; // for computed fire
            this.targetTaskId = id;
        },
        updateTaskValues (id) {
            this.changeTarget(id);
            this.$store.dispatch('updateTaskValues', this.targetTask);
        },
        insertTask () {
            this.$store.dispatch('insertTask');
        },
        deleteTask () {
            this.$store.dispatch('deleteTask', {taskId: this.targetTaskId});
        },
        updateTaskId (amount) {
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
    background-color: white;
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
          * {
              color: silver;
          }
      }

      input {
          width: 100%;
          height: 100%;
          background-color: transparent;
          border: none;
      }

      &.target {
          background-color: lightgray;
      }
  }
}
</style>