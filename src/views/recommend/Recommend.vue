<template>
    <div class="recommend">
        <Scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div v-if="recommends.length" class="silider-wrapper">
                    <slider>
                        <div v-for="item of recommends" :key="item.id">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl" alt="" @load="loadImage" class="needsclick">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌手推荐</h1>
                    <ul>
                        <li v-for="item of discList" :key="item.dissid" class="item">
                            <div class="icon">
                                <img v-lazy="item.imgurl" width="60" height="60">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
               <looading></looading>
            </div>
        </Scroll>
    </div>
</template>
<script>
import Slider from '@/components/slider/Slider'
import Scroll from '@/components/scroll/Scroll'
import Looading from '@/base/loading/Loading'
import { getRecommend, getDiscList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
export default {
    data() {
        return {
            recommends: [],
            discList: []
        }
    },
    components: {
        Slider,
        Scroll,
        Looading
    },
    created() {
        this._getRecommend()
        this._getDiscList()
    },
    methods: {
        _getRecommend() {
            getRecommend().then((res) => {
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider
                }
            })
        },
        _getDiscList() {
            getDiscList().then((res) => {
                if (res.code === ERR_OK) {
                    this.discList = res.data.list
                }
            })
        },
        loadImage() {
            if (!this.checkloaded) {
                this.checkloaded = true
                this.$refs.scroll.refresh()
            }
        }
    }
}
</script>
