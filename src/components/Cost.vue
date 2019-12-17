<template>
    <div id="cost"
    :style="{height: maxHeight + 'px'}">
        <div class="label"
        :style="{height: maxHeight + 'px'}">
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
    data () {
        return {
            maxHeight: 0
        }
    },
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
        windowWidth () {
            return this.$store.state.windowWidth;
        },
        windowHeight () {
            return this.$store.state.windowHeight;
        }
    },
    updated () {console.log('a')
        if (this.splitCost.length === 0) return;
        this.$store.dispatch('setwindowHeight', {
            val:
                this.$el.getElementsByClassName('cost')[0].offsetHeight * this.splitCost.length
                + parseInt(window.getComputedStyle(this.$el.getElementsByClassName('label')[0]).marginTop)
        });
        // this.maxHeight = this.$el.getElementsByClassName('cost')[0].offsetHeight * this.splitCost.length;
    }
}
</script>

<style lang="scss" scoped>
@import '../global.scss';

#cost {
    position: absolute;
    top: 0;
    left: 0;
    // padding-top: $headspace-height;
    // padding-left: $tasks-width;
    // width: 1000px;
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