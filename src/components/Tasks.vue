<template>
    <div id="tasks">
        <p>Tasks</p>
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>name</td>
                    <td>expectation</td>
                    <td>result</td>
                    <!-- <td>isCompleted</td> -->
                    <td>year</td>
                    <td>month</td>
                    <td>day</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks" :key="task.task_id">
                    <td>{{ task.task_id }}</td>
                    <td>{{ task.name }}</td>
                    <td>{{ task.exp_cost }}</td>
                    <td>{{ task.result_cost }}</td>
                    <td>{{ task.result_year }}</td>
                    <td>{{ task.result_month }}</td>
                    <td>{{ task.result_day }}</td>
                </tr>
            </tbody>
        </table>
        <!-- <div v-for="task in tasks" :key="'task' + task.task_id">
        {{ task }}
        </div> -->
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
</style>