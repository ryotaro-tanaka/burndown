<template>
    <div>
        <div v-for="day in days" :key="day.val" class="day">
            {{ day.val }}({{ day.isWork }})
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        // weekly() {
        //     return this.$store.state.weekly.weekly;
        // },
        // startDay () {
        //     return this.$store.getters.startDay;
        // },
        days () {
            const weekly = this.$store.state.weekly.weekly;
            const startDay = this.$store.getters.startDay;
            const amount = 14;//temporary

            let days = [];
            for (let i=0; i<amount; i++) {
                const day = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate());
                day.setDate(day.getDate() + i);

                const week = weekly.filter((w) => {return w.week_id === day.getDay()})[0];

                days.push({
                    val: `${day.getMonth() + 1}/${day.getDate()}`,
                    isWork: (week === undefined)? false: week.is_work === 1
                });
            }

            return days;
        }
    },
    methoeds: {}
}
</script>

<style lang="scss" scoped>
@import '../global.scss';
</style>