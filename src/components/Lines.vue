<template>
    <div id="lines"
    :style="{width: graphWidth + 'px', height: graphHeight + 'px'}">
        <canvas id="canvas-ideal"
        :style="{width: idealWidth + 'px', height: graphHeight + 'px'}">
        </canvas>
        <canvas id="canvas-expected"
        :style="{width: expectedWidth + 'px', height: graphHeight + 'px'}">
        </canvas>
        <canvas id="canvas-result"
        :style="{width: graphWidth + 'px', height: graphHeight + 'px'}">
        </canvas>
        <div id="result-point">
            <div v-for="(point, i) in resultPoints" :key="'point' + i"
            :style="{top: (point.top - 4) + 'px', left: (point.left - 4) + 'px'}">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        //store
        graphWidth () {
            return this.$store.state.graphWidth;
        },
        graphHeight () {
            return this.$store.state.graphHeight;
        },
        allExpectedCost () {
            return this.$store.getters.allExpectedCost;
        },
        //ideal line
        idealPoint () {
            return this.$store.state.idealPoint;
        },
        idealTop () {
            if(this.allExpectedCost % this.idealPoint === 0) return 0;
            const remainder = this.idealPoint - (this.allExpectedCost % this.idealPoint);
            const ratio = remainder / this.idealPoint;
            const costHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--onecost-height'));
            return costHeight * ratio;
        },
        idealDaysCount () { // all expected cost / ideal point
            if (this.allExpectedCost === 0 || this.idealPoint === 0) return 0;
            return Math.ceil(this.allExpectedCost / this.idealPoint);
        },
        idealWidth () {
            const count = this.idealDaysCount;
            const dayWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--days-width'));
            return count * dayWidth;
        },
        //expected line
        expectedDaysCount () { // ideal * (result cost to now / expected cost to now)
            const result = this.$store.getters.resultCostToNow;
            const expected = this.$store.getters.expectedCostToNow;
            if (result === 0 || expected === 0) return 0;

            return Math.ceil(this.idealDaysCount * (result / expected));
        },
        expectedWidth () {
            const count = this.expectedDaysCount;
            const dayWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--days-width'));
            return count * dayWidth;
        },
        //result
        resultPoints () { // {top: cost from top, left: day count}
            // day count
            const startDay = this.$store.getters.startDay;
            const lastDay = this.$store.getters.compuletedTasks.reduce((p, task) =>
                (p.getTime() > new Date(task.result_year, task.result_month, task.result_day).getTime())?
                    p:new Date(task.result_year, task.result_month, task.result_day)
                , new Date(1970, 0, 1));
            const count = (lastDay.getTime() - startDay.getTime()) / (24 * 60 * 60 * 1000);

            // css
            const costHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--onecost-height'));
            const dayWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--days-width'));

            // points
            const points = [];
            let costFromTop = this.allExpectedCost % this.idealPoint;
            for (let i=0; i<=count; i++) {
                const day = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate() + i);
                const point = this.$store.getters.compuletedTasks.reduce((p, task) => 
                    (task.result_year === day.getFullYear() && task.result_month === day.getMonth() && task.result_day === day.getDate())?
                        p + task.exp_cost:p
                    , 0);
                costFromTop = costFromTop + point;

                points.push({
                    top: costFromTop * (costHeight / this.idealPoint),//(result cost + remainder) * (cost height / ideal point)
                    left: (i + 1) * dayWidth
                });
            }
            return points;
        }
    },
    mounted () {
        this.idealLine();
        this.expectedLine();
        this.$store.dispatch('setDaysCount', {val: this.idealDaysCount});
        this.$store.dispatch('setDaysCount', {val: this.expectedDaysCount});
        this.resultLine();
    },
    updated () {
        this.idealLine();
        this.expectedLine();
        this.$store.dispatch('setDaysCount', {val: this.idealDaysCount});
        this.$store.dispatch('setDaysCount', {val: this.expectedDaysCount});
        this.resultLine();
    },
    methods: {
        idealLine () {
            const canvas = document.getElementById('canvas-ideal');
            const ctx = canvas.getContext('2d');

            canvas.height = this.graphHeight;
            canvas.width = this.idealWidth;
            ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--ideal-color');

            ctx.beginPath();
            ctx.moveTo(0, this.idealTop);
            ctx.lineTo(this.idealWidth, this.graphHeight);
            ctx.closePath();
            ctx.stroke();
        },
        expectedLine () {
            const canvas = document.getElementById('canvas-expected');
            const ctx = canvas.getContext('2d');

            canvas.height = this.graphHeight;
            canvas.width = this.expectedWidth;
            ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--expected-color');

            ctx.beginPath();
            ctx.moveTo(0, this.idealTop);
            ctx.lineTo(this.expectedWidth, this.graphHeight);
            ctx.closePath();
            ctx.stroke();
        },
        resultLine () {
            const canvas = document.getElementById('canvas-result');
            const ctx = canvas.getContext('2d');

            canvas.height = this.graphHeight;
            canvas.width = this.graphWidth;
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(0, this.idealTop);
            this.resultPoints.forEach(point => {
                ctx.lineTo(point.left, point.top);
            });
            ctx.stroke();
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../global.scss';

#lines {
    position: absolute;
    top: $headspace-height;
    left: $tasks-width + $headspace-width;
    background-color: transparent;
    #canvas-ideal, #canvas-expected, #canvas-result, #result-point {
        position: absolute;
        top: 0;
        left: 0;
        // pointer-events: none;
    }
    #canvas-result {
        z-index: 1;
    }
    #result-point {
        z-index: 2;
        div {
            position: absolute;
            height: 8px;
            width: 8px;
            background: red;
        }
    }
}
</style>