<template>
    <div id="tasks">
        <!-- <p class="title">Tasks</p> -->
        <div class="buttons">
            <a href="#" @click="insertTask()" :disabled="true"> add </a>
            <a href="#" @click="deleteTask()">delete</a>
            <a href="#" @click="updateTaskId(-1)">up</a>
            <a href="#" @click="updateTaskId(1)">down</a>
            <!-- <input type="button" value="add"
            @click="insertTask()"> -->
            <!-- <input type="button" value="delete"
            @click="deleteTask()">
            <input type="button" value="  ↑  "
            @click="updateTaskId(-1)">
            <input type="button" value="  ↓  "
            @click="updateTaskId(1)"> -->
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
            if(this.targetTaskId <= 0) return;
            this.$store.dispatch('deleteTask', {taskId: this.targetTaskId});
        },
        updateTaskId (amount) {
            if(this.targetTaskId <= 0) return;
            this.$store.dispatch('updateTaskId', {
                    oldTaskId: this.targetTaskId,
                    newTaskId: this.targetTaskId + amount
                })
                .then((newTaskId) => {
                    this.changeTarget(newTaskId);
                });
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
    background-color: white;
    box-shadow: 0 0 2px 2px rgba($color: black, $alpha: 0.3);
    overflow: overlay;
    .buttons {
        height: 36px;
        a {
            position: relative;
            display: inline-block;
            font-weight: bold;
            padding: 0.25em 0;
            text-decoration: none;
            color: navy;
            margin: 0 0.5em;
            width: 48px;
            &::before {
                position: absolute;
                content: '';
                width: 100%;
                height: 4px;
                top:100%;
                left: 0;
                border-radius: 3px;
                // background:#67c5ff;
                background:navy;
                transition: .2s;
            }
            &:hover::before {
                top: -webkit-calc(100% - 3px);
                top: calc(100% - 3px);
            }
        }
    }
}

table{
  width: 100%;
  border-spacing: 0;
  tr {
      th {
        border-bottom: thin solid gainsboro;
        padding: 10px 0;
        &:nth-of-type(1) {
            width: 6%;
            input {
                text-align: right;
            }
        }
        &:nth-of-type(2) {
            width: 48%;
            input {
                text-align: center;
            }
        }
      }
      td {
          &:nth-of-type(1) {
              width: 11%;
          }
          &:nth-of-type(2) {
              width: 11%;
          }
          &:nth-of-type(3) {
              width: 10%;
          }
          &:nth-of-type(4) {
              width: 7%;
          }
          &:nth-of-type(5) {
              width: 7%;
          }
          input {
              text-align: right;
          }
      }

      .exp {
        border-bottom: thin solid $ideal-color;
        text-align: center;
        padding: 10px 0;
      }
      .result {
        border-bottom: thin solid $expected-color;
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
        //   background-color: lightgray;
          background-color: rgba($color: navy, $alpha: 0.2);
      }
  }
}

::-webkit-scrollbar{
  width: 4px;
}
::-webkit-scrollbar-track{
  background: transparent;
  border: none;
  border-radius: 4px;
//   box-shadow: inset 0 0 2px #777; 
}
::-webkit-scrollbar-thumb{
  background: rgba($color: gray, $alpha: 0.1);
  border-radius: 4px;
  box-shadow: none;
}
</style>