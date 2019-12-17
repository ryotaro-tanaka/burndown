<template>
    <div id="cost"
    :style="{width: graphWidth + 'px'}">
        <div class="label"
        :style="{height: graphHeight + 'px'}">
            <div v-for="item in splitCost" :key="item.point"
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
        idealPoint () {
            return this.$store.state.idealPoint;
        },
        allExpectedCost () {
            return this.$store.getters.allExpectedCost;
        },
        splitCost () {
            let arg = [];
            const max = Math.ceil(this.allExpectedCost / this.idealPoint)
            for (let i=max; i>0; i--) {
                arg.push({
                    point: i * this.idealPoint,
                    check: i % 5 === 0
                });
            }
            return arg;
        },
        graphWidth () {
            const graphWidth = this.$store.state.graphWidth;

            if (this.splitCost.length === 0) return graphWidth;
            return graphWidth
                + parseInt(window.getComputedStyle(this.$el.getElementsByClassName('label')[0]).left);
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

#cost {
    position: absolute;
    top: 0;
    left: 0;
    .label {
        position: sticky;
        width: $headspace-width;
        left: $tasks-width;
        top: 0;
        margin-top: $headspace-height;
        .cost {
            border-bottom: thin solid gray;
            height: $onecost-height;
            min-height: $onecost-height;
            span {
                position: relative;
                font-size: 1rem;
                height: 1rem;
                top: -0.5rem;
            }
        }
    }
}
</style>