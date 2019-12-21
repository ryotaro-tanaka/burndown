<template>
    <div id="lines"
    :style="{width: graphWidth + 'px', height: graphHeight + 'px'}">
        <canvas id="canvas-ideal"
        :style="{width: idealWidth + 'px', height: graphHeight + 'px'}">
        </canvas>
        <canvas id="canvas-expected"
        :style="{width: expectedWidth + 'px', height: graphHeight + 'px'}">
        </canvas>
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
            // const result = this.$store.getters.resultCostToNow;
            // const expected = this.$store.getters.expectedCostToNow;

            // if (result === 0 || expected === 0) return 0;
            // return this.idealWidth * (result / expected);
            const count = this.expectedDaysCount;
            const dayWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--days-width'));
            return count * dayWidth;
        },
        //result
    },
    mounted () {
        this.idealLine();
        this.expectedLine();
        this.$store.dispatch('setDaysCount', {val:this.idealDaysCount});
        this.$store.dispatch('setDaysCount', {val:this.expectedDaysCount});
    },
    updated () {
        this.idealLine();
        this.expectedLine();
        this.$store.dispatch('setDaysCount', {val:this.idealDaysCount});
        this.$store.dispatch('setDaysCount', {val:this.expectedDaysCount});
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
    #canvas-ideal, #canvas-expected {
        position: absolute;
        top: 0;
        left: 0;
        // pointer-events: none;
    }
}
</style>