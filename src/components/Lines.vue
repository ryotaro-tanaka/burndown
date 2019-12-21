<template>
    <div id="lines"
    :style="{width:graphWidth+'px', height:graphHeight+'px'}">
        <!-- <div id="ideal-line"
        :style="{
            top: idealTop + 'px',
            borderTopWidth: ((idealHeight-idealTop)/2) + 'px',
            borderBottomWidth: ((idealHeight-idealTop)/2) + 'px',
            borderLeftWidth: (idealWidth/2) + 'px',
            borderRightWidth: (idealWidth/2) + 'px'
        }">
        </div> -->
        <!-- <div id="expected-line"
        :style="{
            top: idealTop + 'px',
            borderTopWidth: ((idealHeight-idealTop)/2) + 'px',
            borderBottomWidth: ((idealHeight-idealTop)/2) + 'px',
            borderLeftWidth: expectedWidth + 'px',
            borderRightWidth: expectedWidth + 'px'
        }">
        </div> -->
        <canvas id="canvas-ideal"
        :style="{width:idealWidth+'px', height:idealHeight+'px'}">
        </canvas>
        <canvas id="canvas-expected"
        :style="{width:expectedWidth+'px', height:idealHeight+'px'}">
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
            return (days * dayWidth);
        },
        idealHeight () {
            return this.graphHeight;
        },
        //expected line
        ////finish -> all expected cost / (all result cost / elapsed day count)
        ////finish -> all expected cost / (expected cost to now / elapsed day count)
        // expectedWidth () {
        //     const allResultCost = this.$store.getters.allResultCost;
        //     const startDay = this.$store.getters.startDay;
        //     const lastDay = this.$store.getters.lastDay;

        //     const elapsedDaysCount = (lastDay.getTime() - startDay.getTime()) / (24 * 60 * 60 * 1000);
            
        //     if(allResultCost === 0 || elapsedDaysCount === 0) return 0;

        //     const dayWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--days-width'));
        //     return (this.allExpectedCost / (allResultCost / elapsedDaysCount)) * dayWidth;
        // },
        //finish -> result cost to now / expected cost to now
        expectedWidth () {
            const result = this.$store.getters.resultCostToNow;
            const expected = this.$store.getters.expectedCostToNow;

            if (result === 0 || expected === 0) return 0;

            // const dayWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--days-width'));
            return this.idealWidth * (result / expected);

        },
        //result
    },
    mounted () {
        console.warn('aaaaaaaaaaaa')
        this.idealLine();
        this.expectedLine();
    },
    updated () {
        console.error('iiiiiiiii');
        this.idealLine();
        this.expectedLine();
    },
    methods: {
        idealLine () {
            const canvas = document.getElementById('canvas-ideal');
            const ctx = canvas.getContext('2d');

            canvas.height = this.idealHeight;
            canvas.width = this.idealWidth;
            ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--ideal-color');

            ctx.beginPath();
            ctx.moveTo(0, this.idealTop);
            ctx.lineTo(this.idealWidth, this.idealHeight);
            ctx.closePath();
            ctx.stroke();
        },
        expectedLine () {
            const canvas = document.getElementById('canvas-expected');
            const ctx = canvas.getContext('2d');

            canvas.height = this.idealHeight;
            canvas.width = this.expectedWidth;
            ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--expected-color');

            ctx.beginPath();
            ctx.moveTo(0, this.idealTop);
            ctx.lineTo(this.expectedWidth, this.idealHeight);
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
    // #ideal-line {
    //     position: absolute;
    //     left: 0;
    //     width: 0;
    //     height: 0;
    //     border-top: solid transparent;
    //     border-right: solid transparent;
    //     border-bottom: solid rgba($color: $ideal-color, $alpha: 0.2);
    //     border-left: solid rgba($color: $ideal-color, $alpha: 0.2);
    //     z-index: 1;
    // }
    // #expected-line {
    //     position: absolute;
    //     left: 0;
    //     width: 0;
    //     height: 0;
    //     border-top: solid transparent;
    //     border-right: solid transparent;
    //     border-bottom: solid rgba($color: $expected-color, $alpha: 0.2);
    //     border-left: solid rgba($color: $expected-color, $alpha: 0.2);
    //     z-index: 0;
    // }
    #canvas-ideal, #canvas-expected {
        position: absolute;
        top: 0;
        left: 0;
        // pointer-events: none;
    }
}
</style>