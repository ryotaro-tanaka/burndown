<template>
    <div id="cost-label"
    :style="{width: graphAndHeadWidth + 'px'}">
        <div class="label"
        :style="{height: graphHeight + 'px'}">
            <div v-for="(item) in splitCost" :key="item.point"
            :class="{checkpoint: item.check}"
            class="cost">
                <span>
                    {{ item.point }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        splitCost () {
            let arg = [];

            const idealPoint = this.$store.state.idealPoint;
            const allExpectedCost = this.$store.getters.allExpectedCost;
            const max = Math.ceil(allExpectedCost / idealPoint);
            for (let i=max; i>0; i--) {
                arg.push({
                    point: i * idealPoint,
                    check: i % 5 === 0
                });
            }
            return arg;
        },
        graphAndHeadWidth () {
            const graphWidth = this.$store.state.graphWidth;
            if (this.splitCost.length === 0) return graphWidth;
            return graphWidth
                + parseInt(window.getComputedStyle(this.$el.getElementsByClassName('label')[0]).left);
        },
        graphHeight () {
            return this.$store.state.graphHeight;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../global.scss';

#cost-label {
    position: absolute;
    top: 0;
    left: 0;
    .label {
        position: sticky;
        width: $headspace-width;
        left: $tasks-width;
        top: 0;
        margin-top: $headspace-height;
        background-color: $frame-color;
        color: $frame-char-color;
        border-right: thin solid $frame-char-color;
        .cost {
            height: $onecost-height;
            min-height: $onecost-height;
            span {
                position: relative;
                font-size: 1em;
                height: 1em;
                top: -0.5em;
            }
        }
        .checkpoint {
            font-size: 1.5rem;
        }
    }
}
</style>