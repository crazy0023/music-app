<template>
    <div class="recommend">
        <div class="recommend-content">
            <div v-if="recommends.length" class="silider-wrapper">
                <slider>
                    <div v-for="item of recommends" :key="item.id">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" alt="">
                        </a>
                    </div>
                </slider>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌手推荐</h1>
            </div>
        </div>
    </div>
</template>
<script>
import Slider from '@/components/slider/Slider'
import { getRecommend } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
export default {
    data() {
        return {
            recommends: []
        }
    },
    components: {
        Slider
    },
    created() {
        this._getRecommend()
    },
    methods: {
        _getRecommend() {
            getRecommend().then((res) => {
                if (res.code === ERR_OK) {
                    console.log(res.data.slider)
                    this.recommends = res.data.slider
                }
            })
        }
    }
}
</script>
