<template>
    <div class="singer" ref="singer">
        <ListView :data="singers"></ListView>
    </div>
</template>
<script>
import {getSingerList} from '@/api/singer'
import { ERR_OK } from '@/api/config'
import Singer from '@/assets/js/singer'
import ListView from '@/base/listView/ListView'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
    data() {
        return {
            singers: []
        }
    },
     created() {
         this._getSingerList()
     },
     components: {
         ListView
     },
     methods: {
         _getSingerList() {
             getSingerList().then((res) => {
                 if (res.code === ERR_OK) {
                     this.singers = this._normalizeSinger(res.data.list)
                     console.log(this._normalizeSinger(res.data.list))
                 }
             })
         },
         _normalizeSinger(list) {
             let map = {
                 hot: {
                     title: HOT_NAME,
                     items: []
                 }
             }
             list.forEach((item, index) => {
                 if (index < HOT_SINGER_LEN) {
                     map.hot.items.push(new Singer({
                        name: item.Fsinger_name,
                        id: item.Fsinger_mid
                     }))
                 }
                 let key = item.Findex
                 if (!map[key]) {
                     map[key] = {
                         title: key,
                         items: []
                     }
                 }
                 map[key].items.push(new Singer({
                        name: item.Fsinger_name,
                        id: item.Fsinger_mid
                     }))
             })
             let hot = []
             let ret = []
             for(let key in map) {
                 let val = map[key]
                 if (val.title.match(/[a-zA-Z]/)) {
                     ret.push(val)
                 } else if (val.title === HOT_NAME) {
                     hot.push(val)
                 }
             }
             ret.sort((a,b) => {
                 return a.title.charCodeAt(0) - b.title.charCodeAt(0)
             })
             return hot.concat(ret)
         }
     }
}
</script>

