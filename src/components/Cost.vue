<template>
    <div id="cost"
    :style="{width: graphAndHeadWidth + 'px'}">
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
        idealPoint () {
            return this.$store.state.idealPoint;
        },
        allExpectedCost () {
            return this.$store.getters.allExpectedCost;
        },
        splitCost () {
            let arg = [];

            // const second = Math.floor(this.allExpectedCost / this.idealPoint);
            // let first = second + this.allExpectedCost % this.idealPoint;
            // if (first !== 0) {
            //     arg.push({
            //         point: second + first,
            //         check: false
            //     });
            // }

            const max = Math.ceil(this.allExpectedCost / this.idealPoint);
            for (let i=max; i>0; i--) {
                arg.push({
                    point: i * this.idealPoint,
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
        background-color: $frame-color;
        color: $frame-char-color;
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
    .memory {
        position: absolute;
        width: 100px;
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