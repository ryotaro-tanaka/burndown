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
        //ideal
        idealPoint () {
            return this.$store.state.idealPoint;
        },
        allExpectedCost () {
            return this.$store.getters.allExpectedCost;
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
        //exp
        //zisseki
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
    }
}
</style>