<template>
    <div id="days"
    :style="{height: graphHeight + 'px'}">
        <div class="label"
        :style="{width: graphWidth + 'px'}">
            <div class="day"
            :class="{nonWork: !day.isWork}"
            v-for="day in days" :key="day.val">
                {{ day.val }}
            </div>
        </div>
        <div class="memory"
        :style="{width: graphWidth + 'px', height: graphHeight + 'px'}">
            <div class="day"
            :class="{nonWork: !day.isWork, monday: day.weekId === 0}"
            v-for="day in days" :key="'memory' + day.val">
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
    },
    updated() {
        if (this.daysCount === 0) return;
        this.$store.dispatch('setGraphWidth', {val: 
            this.$el.getElementsByClassName('day')[0].offsetWidth * this.daysCount
        })
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
@import '../global.scss';

#days {
    position: absolute;
    top: 0;
    left: 0;
    // pointer-events: none;
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
    .memory {
        position: absolute;
        display: flex;
        top: $headspace-height;
        left: $headspace-width + $tasks-width;
        background: transparent;
        z-index: -1;
        .day {
            border-right: thin solid $frame-char-color;
            width: $days-width;
            min-width: $days-width;
            overflow: hidden;
        }
        .nonWork {
            background-color: rgba($color: $frame-char-color, $alpha: 0.1);
        }
        .monday {
            border-left: thin solid $frame-char-color;
        }
    }
}
</style>