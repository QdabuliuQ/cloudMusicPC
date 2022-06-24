import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const HomePage = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/HomePage.vue')
const DiscoverMusic = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/DiscoverMusic.vue')
const Recommend = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/Recommend.vue')
const SongSheet = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/SongSheet.vue')
const RankingList = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/RankingList.vue')
const SingersList = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/SingersList.vue')
const NewSongs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/NewSongs.vue')
const NewMusicList = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/NewMusicList.vue')

const Video = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Video/Video.vue')

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/HomePage' },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage,
    children: [
      {
        path: '/HomePage',
        redirect: '/DiscoverMusic',
      },
      {
        path: '/DiscoverMusic',
        name: 'DiscoverMusic',
        meta: {
          index: 0
        },
        component: DiscoverMusic,
        children: [
          {
            path: '/DiscoverMusic',
            redirect: '/Recommend'
          },
          {
            path: '/Recommend',
            name: 'Recommend',
            meta: {
              xIndex: 0
            },
            component: Recommend,
          },
          {
            path: '/SongSheet',
            name: 'SongSheet',
            meta: {
              xIndex: 1
            },
            component: SongSheet,
          },
          {
            path: '/RankingList',
            name: 'RankingList',
            meta: {
              xIndex: 2
            },
            component: RankingList,
          },
          {
            path: '/SingersList',
            name: 'SingersList',
            meta: {
              xIndex: 3
            },
            component: SingersList,
          },
          {
            path: '/NewSongs',
            name: 'NewSongs',
            meta: {
              xIndex: 4
            },
            component: NewSongs,
            children: [
              { path: '/NewSongs', redirect: '/NewMusicList' },
              { path: '/NewMusicList', name: 'NewMusicList', component: NewMusicList }
            ]
          },
        ]
      },
      {
        path: '/Video',
        name: 'Video',
        meta: {
          index: 1
        },
        component: Video,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
