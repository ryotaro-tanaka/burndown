<template>
    <div id="days">
        <div id="label"
        :style="{width: maxWidth + 'px'}">
            <div class="day"
            v-for="day in days" :key="day.val">
                {{ day.val }}({{ day.isWork }})
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            maxWidth: 0
        }
    },
    computed: {
        daysCount () {
            return this.$store.state.daysCount;
        },
        days () {
            const weekly = this.$store.state.weekly.weekly;
            const startDay = this.$store.getters.startDay;
            const daysCount = this.daysCount;

            let days = [];
            for (let i=0; i<daysCount; i++) {
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
    mounted() {
        this.maxWidth = this.$el.getElementsByClassName('day')[0].offsetWidth * this.daysCount;
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
@import '../global.scss';

#days {
    position: absolute;
    top: 0;
    left: $tasks-width + $headspace-width;
    #label {
        position: sticky;
        display: flex;
        height: $headspace-height;
        .day {
            border-bottom: medium solid black;
            border-right: thin solid gray;
            width: $days-width;
            min-width: $days-width;
        }
    }
}
</style>