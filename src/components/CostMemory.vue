<template>
    <div id="cost-memory"
    :style="{width: graphAndHeadWidth + 'px'}">
        <div class="memory"
        :style="{height: graphHeight + 'px',width: graphWidth + 'px'}">
            <div v-for="item in splitCost" :key="'memory' + item.point"
            :class="{checkpoint: item.check}"
            class="cost">
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
        graphWidth () {
            return this.$store.state.graphWidth;
        },
        graphAndHeadWidth () {
            if (this.splitCost.length === 0) return this.graphWidth;
            return this.graphWidth
                + parseInt(window.getComputedStyle(this.$el.getElementsByClassName('memory')[0]).left);
        },
        graphHeight () {
            return this.$store.state.graphHeight;
        }
    },
    updated () {
        if (this.splitCost.length === 0) return;
        this.$store.dispatch('setGraphHeight', {val:
            this.$el.getElementsByClassName('cost')[0].offsetHeight * this.splitCost.length
        });
    }
}
</script>

<style lang="scss" scoped>
@import '../global.scss';

#cost-memory {
    position: absolute;
    top: 0;
    left: 0;
    .memory {
        position: absolute;
        left: $tasks-width + $headspace-width;
        top: 0;
        margin-top: $headspace-height;
        background: transparent;
        z-index: -1;
        .cost {
            border-bottom: thin solid $frame-char-color;
            height: $onecost-height;   
        }
        .checkpoint {
            border-top: thin solid $frame-char-color;
        }
    }
}
</style>