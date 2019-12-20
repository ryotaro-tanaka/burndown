<template>
    <div id="lines">
        <div id="ideal-line"
        :style="{
            top: idealTop + 'px',
            borderTopWidth: idealHeight + 'px',
            borderBottomWidth: idealHeight + 'px',
            borderLeftWidth: idealWidth + 'px',
            borderRightWidth: idealWidth + 'px'
        }">
        </div>
        <div id="expected-line"
        :style="{
            top: idealTop + 'px',
            borderTopWidth: idealHeight + 'px',
            borderBottomWidth: idealHeight + 'px',
            borderLeftWidth: expectedWidth + 'px',
            borderRightWidth: expectedWidth + 'px'
        }">
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
        //finish -> all expected cost / ideal point
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
        idealWidth () {
            const days = Math.ceil(this.allExpectedCost / this.idealPoint);
            const dayWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--days-width'));
            return (days * dayWidth) / 2;
        },
        idealHeight () {
            return (this.graphHeight - this.idealTop) / 2;
        },
        //expected line
        //finish -> all expected cost / (all result cost / elapsed day count)
        expectedWidth () {
            const allResultCost = this.$store.getters.allResultCost;
            const startDay = this.$store.getters.startDay;
            const lastDay = this.$store.getters.lastDay;

            const elapsedDaysCount = (lastDay.getTime() - startDay.getTime()) / (24 * 60 * 60 * 1000);
            
            if(allResultCost === 0 || elapsedDaysCount === 0) return 0;
            // console.log(startDay.getTime() / 60000);
            // console.log(lastDay)
            // console.log(this.allExpectedCost / (allResultCost / elapsedDaysCount));

            const dayWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--days-width'));
            return (this.allExpectedCost / (allResultCost / elapsedDaysCount)) * dayWidth;
        },
        //result
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
    #ideal-line {
        position: absolute;
        left: 0;
        width: 0;
        height: 0;
        border-top: solid transparent;
        border-right: solid transparent;
        border-bottom: solid rgba($color: $ideal-color, $alpha: 0.2);
        border-left: solid rgba($color: $ideal-color, $alpha: 0.2);
        z-index: 1;
    }
    #expected-line {
        position: absolute;
        left: 0;
        width: 0;
        height: 0;
        border-top: solid transparent;
        border-right: solid transparent;
        border-bottom: solid rgba($color: $expected-color, $alpha: 0.2);
        border-left: solid rgba($color: $expected-color, $alpha: 0.2);
        z-index: 0;
    }
}
</style>