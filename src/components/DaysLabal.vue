<template>
    <div id="days-label"
    :style="{height: graphHeight + 'px'}">
        <div class="label"
        :style="{width: graphWidth + 'px'}">
            <div class="day"
            :class="{nonWork: !day.isWork}"
            v-for="day in days" :key="day.val">
                {{ day.val }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        days () {
            const weekly = this.$store.state.weekly.weekly;
            const startDay = this.$store.getters.startDay;
            const daysCount = this.$store.state.daysCount;

            let days = [];
            for (let i=0; i<daysCount; i++) {
                const day = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate());
                day.setDate(day.getDate() + i);

                const week = weekly.filter((w) => {return w.week_id === day.getDay()})[0];

                days.push({
                    val: `${day.getMonth() + 1}/${day.getDate()}`,
                    isWork: (week === undefined)? false: week.is_work === 1,
                    weekId: (week === undefined)? -1: week.week_id
                });
            }

            return days;
        },
        graphWidth () {
            return this.$store.state.graphWidth;
        },
        graphHeight () {
            return this.$store.state.graphHeight;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../global.scss';

#days-label {
    position: absolute;
    top: 0;
    left: 0;
    .label {
        position: sticky;
        display: flex;
        height: $headspace-height;
        top: 0;
        left: 0;
        margin-left: $headspace-width + $tasks-width;
        background-color: $frame-color;
        color: $frame-char-color;
        .day {
            border-bottom: thin solid $frame-char-color;
            width: $days-width;
            min-width: $days-width;
            overflow: hidden;
        }
        .nonWork {
            color: rgba($color: $frame-char-color, $alpha: 0.5);
        }
    }
}
</style>