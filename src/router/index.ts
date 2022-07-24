import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import useLogin from "@/hooks/useLogin";
const HomePage = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/HomePage.vue')
const DiscoverMusic = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/DiscoverMusic.vue')
const Recommend = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/Recommend.vue')
const SongSheet = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/SongSheet.vue')
const RankingList = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/RankingList.vue')
const SingersList = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/SingersList.vue')
const NewSongs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/NewSongs.vue')
const NewMusicList = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/NewMusicList.vue')
const NewDisc = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/views/NewDisc.vue')
const RecommendSongs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/DiscoverMusic/RecommendSongs.vue')

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
const MvPlay = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/MvPlay/MvPlay.vue')

const SheetDetail = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SheetDetail/SheetDetail.vue')
const SheetSongs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SheetDetail/views/SheetSongs.vue')
const SheetComment = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SheetDetail/views/SheetComment.vue')
const SheetCollect = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SheetDetail/views/SheetCollect.vue')
const EditSheet = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/EditSheet/EditSheet.vue')

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

const UserDetail = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/AccountDetail/UserDetail.vue')
const UserSheet = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/AccountDetail/views/UserSheet.vue')

const CommentDetail = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/CommentDetail/CommentDetail.vue')

const SearchResult = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SearchResult/SearchResult.vue')
const SearchSongs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SearchResult/views/SearchSongs.vue')
const SearchSingers = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SearchResult/views/SearchSingers.vue')
const SearchAlbums = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SearchResult/views/SearchAlbums.vue')
const SearchVideos = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SearchResult/views/SearchVideos.vue')
const SearchMvs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SearchResult/views/SearchMvs.vue')
const SearchSheets = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SearchResult/views/SearchSheets.vue')
const SearchTexts = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SearchResult/views/SearchTexts.vue')
const SearchAudios = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SearchResult/views/SearchAudios.vue')
const SearchUsers = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SearchResult/views/SearchUsers.vue')

const SingerDetail = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SingerDetail/SingerDetail.vue')
const SingerSongs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SingerDetail/views/SingerSongs.vue')
const SingerInfo = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SingerDetail/views/SingerInfo.vue')
const SingerMvs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SingerDetail/views/SingerMvs.vue')
const SingerAlbums = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SingerDetail/views/SingerAlbums.vue')
const SingerSimilar = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/SingerDetail/views/SingerSimilar.vue')

const AlbumDetail = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/AlbumDetail/AlbumDetail.vue')
const AlbumSongs = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/AlbumDetail/views/AlbumSongs.vue')
const AlbumComments = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/AlbumDetail/views/AlbumComments.vue')
const AlbumInfo = () => import(/* webpackChunkName:"HomePageChunk" */ 'views/AlbumDetail/views/AlbumInfo.vue')

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
        path: '/RecommendSongs',
        name: 'RecommendSongs',
        meta: {
          index: 0,
          login: true
        },
        component: RecommendSongs
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
          index: 3,
          login: true
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
        path: '/EditSheet',
        name: 'EditSheet',
        meta: {
          login: true
        },
        component: EditSheet
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
        meta: {
          login: true
        },
        component: UserFollow
      },
      {
        path: '/UserFans',
        name: 'UserFans',
        meta: {
          login: true
        },
        component: UserFans
      },
      {
        path: '/UserEvents',
        name: 'UserEvents',
        meta: {
          login: true
        },
        component: UserEvents
      },
      {
        path: '/UserInfoEdit',
        name: 'UserInfoEdit',
        meta: {
          login: true
        },
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
          index: 4,
          login: true
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
          index: 5,
          login: true
        },
        component: CloudDick,
      },
      {
        path: '/Collect',
        name: 'Collect',
        meta: {
          index: 6,
          login: true
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
        meta: {
          login: true
        },
        component: SheetDetail,
        children: [
          { path: '/MySheet', redirect: '/SheetSongs' },
          { path: '/SheetSongs', meta: { sheetIndex: 0 }, name: 'SheetSongs', component: SheetSongs },
          { path: '/SheetComment', meta: { sheetIndex: 1 }, name: 'SheetComment', component: SheetComment },
          { path: '/SheetCollect', meta: { sheetIndex: 2 }, name: 'SheetCollect', component: SheetCollect },
        ]
      },
      {
        path: '/UserDetail',
        name: 'UserDetail',
        meta: {
        },
        component: UserDetail,
        children: [
          {path: '/UserDetail', redirect: '/UserSheet'},
          {path: '/UserSheet', name: 'UserSheet', meta: {
            userInfoIndex: 0
          }, component: UserSheet},
          {path: '/UserCollect', name: 'UserCollect', meta: {
            userInfoIndex: 1
          }, component: UserSheet},
          {path: '/UserEventList', name: 'UserEventList', meta: {
            userInfoIndex: 2
          }, component: UserEvents},
          {path: '/UserFollowList', name: 'UserFollowList', meta: {
            userInfoIndex: 3
          }, component: UserFollow},
          {path: '/UserFansList', name: 'UserFansList', meta: {
            userInfoIndex: 4
          }, component: UserFans},
        ]
      },
      {
        path: '/CommentDetail',
        name: 'CommentDetail',
        component: CommentDetail
      },
      {
        path: '/SearchResult',
        name: 'SearchResult',
        component: SearchResult,
        children: [
          { path: '/SearchResult', redirect: '/SearchSongs' },
          { 
            path: '/SearchSongs',
            name: 'SearchSongs',
            meta: {
              searchIndex: 0
            },
            component: SearchSongs
          },
          { 
            path: '/SearchSingers',
            name: 'SearchSingers',
            meta: {
              searchIndex: 1
            },
            component: SearchSingers
          },
          { 
            path: '/SearchAlbums',
            name: 'SearchAlbums',
            meta: {
              searchIndex: 2
            },
            component: SearchAlbums
          },
          { 
            path: '/SearchVideos',
            name: 'SearchVideos',
            meta: {
              searchIndex: 3
            },
            component: SearchVideos
          },
          { 
            path: '/SearchMvs',
            name: 'SearchMvs',
            meta: {
              searchIndex: 4
            },
            component: SearchMvs
          },
          { 
            path: '/SearchSheets',
            name: 'SearchSheets',
            meta: {
              searchIndex: 5
            },
            component: SearchSheets
          },
          { 
            path: '/SearchTexts',
            name: 'SearchTexts',
            meta: {
              searchIndex: 6
            },
            component: SearchTexts
          },
          { 
            path: '/SearchAudios',
            name: 'SearchAudios',
            meta: {
              searchIndex: 7
            },
            component: SearchAudios
          },
          { 
            path: '/SearchUsers',
            name: 'SearchUsers',
            meta: {
              searchIndex: 8
            },
            component: SearchUsers
          },
        ]
      },
      {
        path: '/SingerDetail',
        name: 'SingerDetail',
        component: SingerDetail,
        children: [
          {
            path: '/SingerDetail',
            redirect: '/SingerSongs'
          },
          {
            path: '/SingerSongs',
            name: 'SingerSongs',
            meta: {
              singerIndex: 0
            },
            component: SingerSongs,
          },
          {
            path: '/SingerAlbums',
            name: 'SingerAlbums',
            meta: {
              singerIndex: 1
            },
            component: SingerAlbums,
          },
          {
            path: '/SingerMvs',
            name: 'SingerMvs',
            meta: {
              singerIndex: 2
            },
            component: SingerMvs,
          },
          {
            path: '/SingerInfo',
            name: 'SingerInfo',
            meta: {
              singerIndex: 3
            },
            component: SingerInfo,
          },
          {
            path: '/SingerSimilar',
            name: 'SingerSimilar',
            meta: {
              singerIndex: 4
            },
            component: SingerSimilar,
          },
        ]
      },
      {
        path: '/AlbumDetail',
        name: 'AlbumDetail',
        component: AlbumDetail,
        children: [
          {
            path: '/AlbumDetail',
            redirect: '/AlbumSongs'
          }, 
          {
            path: '/AlbumSongs',
            name: 'AlbumSongs',
            meta: {
              albumIndex: 0
            },
            component: AlbumSongs
          },
          {
            path: '/AlbumComments',
            name: 'AlbumComments',
            meta: {
              albumIndex: 1
            },
            component: AlbumComments
          },
          {
            path: '/AlbumInfo',
            name: 'AlbumInfo',
            meta: {
              albumIndex: 2
            },
            component: AlbumInfo
          },
        ]
      }
    ]
  },
  {
    path: '/VideoPlay',
    name: 'VideoPlay',
    component: VideoPlay
  },
  {
    path: '/MvPlay',
    name: 'MvPlay',
    component: MvPlay
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

router.beforeEach((to, from, next) => {
	// 判断有没有登录
	if (to.meta.login) {
    if (useLogin(false)) {
      next();
    } else {
      useLogin(true)
    }
	} else {
		next();
	}
});

export default router
