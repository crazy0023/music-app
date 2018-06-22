import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/views/recommend/Recommend'
import Singer from '@/views/singer/Singer'
import Rank from '@/views/rank/Rank'
import Search from '@/views/search/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
  ]
})
