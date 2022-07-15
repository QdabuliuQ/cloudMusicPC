import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const HomePage = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/HomePage.vue')
const DiscoverMusic = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/DiscoverMusic.vue')
const Recommend = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/Recommend.vue')
const SongSheet = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/SongSheet.vue')
const RankingList = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/RankingList.vue')
const SingersList = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/SingersList.vue')
const NewSongs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/NewSongs.vue')
const NewMusicList = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/NewMusicList.vue')
const NewDisc = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/NewDisc.vue')

const Video = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Video/Video.vue')
const VideoList = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Video/views/VideoList.vue')
const MvList = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Video/views/MvList.vue')
const MvAllList = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Video/views/MvAllList.vue')

const Audio = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Audio/Audio.vue')
const AudioList = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Audio/views/AudioList.vue')
const AudioDetail = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Audio/views/AudioDetail.vue')
const AudioSongs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Audio/views/AudioSongs.vue')
const AudioCollect = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Audio/views/AudioCollect.vue')

const VideoPlay = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/VideoPlay/VideoPlay.vue')

const SheetDetail = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SheetDetail/SheetDetail.vue')
const SheetSongs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SheetDetail/views/SheetSongs.vue')
const SheetComment = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SheetDetail/views/SheetComment.vue')
const SheetCollect = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SheetDetail/views/SheetCollect.vue')

const UserFollow = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/UserInfo/UserFollow.vue')
const UserFans = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/UserInfo/UserFans.vue')
const UserEvents = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/UserInfo/UserEvents.vue')
const UserInfoEdit = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/UserInfo/UserInfoEdit.vue')

const Recent = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Recent/Recent.vue')
const RecentSongs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Recent/views/RecentSongs.vue')
const RecentVideos = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Recent/views/RecentVideos.vue')
const RecentPrograms = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Recent/views/RecentPrograms.vue')
const RecentSheets = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Recent/views/RecentSheets.vue')
const RecentAlbums = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Recent/views/RecentAlbums.vue')
const RecentAudios = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Recent/views/RecentAudios.vue')

const CloudDick = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/CloudDick/CloudDick.vue')

const Collect = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Collect/Collect.vue')
const CollectAlbums = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Collect/views/CollectAlbums.vue')
const CollectSingers = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Collect/views/CollectSingers.vue')
const CollectMvs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Collect/views/CollectMvs.vue')
const CollectArticles = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Collect/views/CollectArticles.vue')

const Follow = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Follow/Follow.vue')
const Topic = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Topic/Topic.vue')
const TopicDetail = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/Topic/TopicDetail.vue')

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
              { path: '/NewMusicList', meta: { yIndex: 0 }, name: 'NewMusicList', component: NewMusicList },
              { path: '/NewDisc', meta: { yIndex: 1 }, name: 'NewDisc', component: NewDisc }
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
        children: [
          { path: '/Video', redirect: '/VideoList' },
          { path: '/VideoList', meta: { vIndex: 0 }, name: 'VideoList', component: VideoList },
          { path: '/MvList', meta: { vIndex: 1 }, name: 'MvList', component: MvList },
        ]
      },
      {
        path: '/MvAllList',
        name: 'MvAllList',
        meta: {
          index: 1
        },
        component: MvAllList,
      },
      {
        path: '/Audio',
        name: 'Audio',
        meta: {
          index: 2
        },
        component: Audio
      },
      {
        path: '/Follow',
        name: 'Follow',
        meta: {
          index: 3
        },
        component: Follow,
        children: [
          { path: '/Follow', redirect: '/FollowUserEvents' },
          { path: '/FollowUserEvents', name: 'FollowUserEvents', component: UserEvents }
        ]
      },
      {
        path: '/AudioList',
        name: 'AudioList',
        meta: {
          index: 2
        },
        component: AudioList
      },
      {
        path: '/AudioDetail',
        name: 'AudioDetail',
        meta: {
          index: 2
        },
        component: AudioDetail,
        children: [
          { path: '/AudioDetail', redirect: '/AudioSongs' },
          { path: '/AudioSongs', meta: { kIndex: 0 }, name: 'AudioSongs', component: AudioSongs },
          { path: '/AudioCollect', meta: { kIndex: 1 }, name: 'AudioCollect', component: AudioCollect }
        ]
      },
      {
        path: '/SheetDetail',
        name: 'SheetDetail',
        component: SheetDetail,
        children: [
          { path: '/SheetDetail', redirect: '/SheetSongs' },
          { path: '/SheetSongs', meta: { sheetIndex: 0 }, name: 'SheetSongs', component: SheetSongs },
          { path: '/SheetComment', meta: { sheetIndex: 1 }, name: 'SheetComment', component: SheetComment },
          { path: '/SheetCollect', meta: { sheetIndex: 2 }, name: 'SheetCollect', component: SheetCollect },
        ]
      },
      {
        path: '/UserFollow',
        name: 'UserFollow',
        component: UserFollow
      },
      {
        path: '/UserFans',
        name: 'UserFans',
        component: UserFans
      },
      {
        path: '/UserEvents',
        name: 'UserEvents',
        component: UserEvents
      },
      {
        path: '/UserInfoEdit',
        name: 'UserInfoEdit',
        component: UserInfoEdit
      },
      {
        path: '/Topic',
        name: 'Topic',
        component: Topic
      },
      {
        path: '/TopicDetail',
        name: 'TopicDetail',
        component: TopicDetail,
        children: [
          { path: '/TopicDetail', redirect: '/TopicEvent' },
          { path: '/TopicEvent', name: 'TopicEvent', component: UserEvents }
        ]
      },
      {
        path: '/Recent',
        name: 'Recent',
        meta: {
          index: 5
        },
        component: Recent,
        children: [
          { path: '/Recent', redirect: '/RecentSongs' },
          {
            path: '/RecentSongs', name: 'RecentSongs', meta: {
              recentIndex: 0
            }, component: RecentSongs
          },
          {
            path: '/RecentVideos', name: 'RecentVideos', meta: {
              recentIndex: 1
            }, component: RecentVideos
          },
          {
            path: '/RecentPrograms', name: 'RecentPrograms', meta: {
              recentIndex: 2
            }, component: RecentPrograms
          },
          {
            path: '/RecentSheets', name: 'RecentSheets', meta: {
              recentIndex: 3
            }, component: RecentSheets
          },
          {
            path: '/RecentAlbums', name: 'RecentAlbums', meta: {
              recentIndex: 4
            }, component: RecentAlbums
          },
          {
            path: '/RecentAudios', name: 'RecentAudios', meta: {
              recentIndex: 5
            }, component: RecentAudios
          },
        ]
      },
      {
        path: '/CloudDick',
        name: 'CloudDick',
        meta: {
          index: 6
        },
        component: CloudDick,
      },
      {
        path: '/Collect',
        name: 'Collect',
        meta: {
          index: 8
        },
        component: Collect,
        children: [
          { path: '/Collect', redirect: '/CollectAlbums' },
          { path: '/CollectAlbums', name: 'CollectAlbums', meta: {
            collectIndex: 0
          }, component: CollectAlbums },
          { path: '/CollectSingers', name: 'CollectSingers', meta: {
            collectIndex: 1
          }, component: CollectSingers },
          { path: '/CollectMvs', name: 'CollectMvs', meta: {
            collectIndex: 2
          }, component: CollectMvs },
          { path: '/CollectArticles', name: 'CollectArticles', meta: {
            collectIndex: 3
          }, component: CollectArticles },
        ]
      },
      {
        path: '/MySheet',
        name: 'MySheet',
        component: SheetDetail,
        children: [
          { path: '/MySheet', redirect: '/SheetSongs' },
          { path: '/SheetSongs', meta: { sheetIndex: 0 }, name: 'SheetSongs', component: SheetSongs },
          { path: '/SheetComment', meta: { sheetIndex: 1 }, name: 'SheetComment', component: SheetComment },
          { path: '/SheetCollect', meta: { sheetIndex: 2 }, name: 'SheetCollect', component: SheetCollect },
        ]
      },
    ]
  },
  {
    path: '/VideoPlay',
    name: 'VideoPlay',
    component: VideoPlay
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
})

export default router
