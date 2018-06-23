<template>
    <scroll class="listview" 
            ref="listview" :data="data" 
            :listenScroll="listenScroll"
            :probeType = 'probeType'
            @scroll="scroll">
        <ul>
            <li v-for="(group, index) in data" class="list-group" :key="index" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item of group.items" class="list-group-item" :key="item.id">
                        <img v-lazy="item.avatar" alt="" class="avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item, index) of shortcutList" 
                    class="item" 
                    :class="{current: currentIndex === index}"
                    :data-index="index" 
                    :key="item">{{item}}</li>
            </ul>
        </div>
    </scroll>
</template>
<script>
import Scroll from '@/components/scroll/Scroll'
import {getData} from '@/assets/js/dom'
const ANCHOR_HEIGHT = 18
export default {
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            scrollY: -1,
            currentIndex: 0
        }
    },
    created() {
        this.touch = {}
        this.listenScroll = true
        this.listHeight = []
        this.probeType = 3
    },
    computed: {
        shortcutList() {
            return this.data.map((group) => {
                return group.title.substr(0, 1)
            })
        }
    },
    methods: {
        onShortcutTouchStart(e) {
            let anchorIndex = getData(e.target, 'index')
            let firstTouch = e.touches[0]
            this.touch.y1 = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this._scrollTo(anchorIndex)
        },
        onShortcutTouchMove(e) {
            let firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
            let anchorIndex = parseInt(this.touch.anchorIndex) + delta
            this._scrollTo(anchorIndex)
        },
        scroll(pos) {
            this.scrollY = pos.y
        },
        _scrollTo(index) {
            if (!index && index !== 0) return
            if (index < 0) {
                index = 0
            } else if (index > this.listHeight.length -2) {
                index = this.listHeight.length -2
            }
            this.scrollY = -this.listHeight[index]
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
        },
        _calculateHeight() {
            this.listHeight = []
            const list  = this.$refs.listGroup
            let height = 0
            this.listHeight.push(height)
            for (let i=0; i<list.length; i++) {
                let item = list[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this._calculateHeight()
            }, 20)
        },
        scrollY(newY) {
            const listHeight = this.listHeight
            if (newY > 0) {
                return this.currentIndex = 0
            }
            for(let i=0;i<listHeight.length - 1; i++) {
                let height1 = listHeight[i]
                let height2 = listHeight[i+1]
                if (-newY>=height1 && -newY<height2) {
                    this.currentIndex = i
                    return
                }
            }
            this.currentIndex = listHeight.length - 2
        }
    },
    components: {
        Scroll
    }
}
</script>
