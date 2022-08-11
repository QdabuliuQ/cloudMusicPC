<template>
  <div id="Recommend">
    <el-carousel
      v-if="bannerList.length"
      :interval="4000"
      type="card"
      :height="bannerHeight + 'px'"
    >
      <el-carousel-item v-for="item in bannerList" :key="item.imageUrl">
        <a :href="item.url">
          <img ref="bannerRef" :src="item.imageUrl" alt="" />
        </a>
        <div class="imageTarget">
          {{ item.typeTitle }}
        </div>
      </el-carousel-item>
    </el-carousel>
    <splitLine :title="'推荐歌单'" :icon="true"></splitLine>
    <loading v-if="!sheetList.length"></loading>
    <div v-else class="sheetContainer">
      <sheetItem
        v-if="login"
        :type="'sheet'"
        @click="toRecommend"
        :title="'每日歌曲推荐'"
        :recommend="true"
      ></sheetItem>
      <sheetItem
        :type="'sheet'"
        :id="item.id"
        @click="toSheetDetail(item.id)"
        v-for="item in sheetList"
        :key="item.id"
        :imageUrl="item.picUrl"
        :title="item.name"
        :sum="item.playCount"
      ></sheetItem>
    </div>
    <splitLine :title="'独家放送'" :icon="true"></splitLine>
    <loading v-if="!privateList.length"></loading>
    <div v-else class="privateContainer">
      <videoItem
        v-for="item in privateList"
        :key="item.id"
        :imageUrl="item.sPicUrl"
        :title="item.name"
        :topLeftIcon="true"
      ></videoItem>
    </div>
    <splitLine :title="'最新音乐'" :icon="true"></splitLine>
    <loading v-if="!newSongsList.length"></loading>
    <div v-else class="newSongContainer">
      <newMusicItem
        v-for="item,index in newSongsList"
        @playMusic='playMusic'
        :index='index'
        :key="item.id"
        :imageUrl="item.picUrl"
        :musicName="item.name"
        :musicSinger="item.song.artists"
        :mvid="item.song.mvid"
      ></newMusicItem>
    </div>
    <splitLine :title="'推荐MV'" :icon="true"></splitLine>
    <loading v-if="!recommendMvList.length"></loading>
    <div v-else class="mvContainer">
      <videoItem
        v-for="item in recommendMvList"
        :key="item.id"
        :imageUrl="item.picUrl"
        :title="item.name"
        :artists="item.artists"
        :playCount="item.playCount"
        :topLeftIcon="false"
        :centerIcon='true'
        :ratio='"2/1.1"'
      ></videoItem>
    </div>
    <splitLine :title="'推荐电台'" :icon="true"></splitLine>
    <loading v-if="!programsList.length"></loading>
    <div v-else class="programContainer">
      <programItem
        v-for="item in programsList"
        :key="item.id"
        :coverUrl="item.coverUrl"
        :name="item.name"
        :channels="item.channels"
        :id="item.id"
        :dj="item.dj"
      ></programItem>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  defineAsyncComponent,
} from "vue";
import {
  getBanner,
  getRecommendSheet,
  getPrivateContent,
  getNewSongs,
  getRecommendMv,
  getRecommendProgram,
} from "@/network/DiscoverMusic/recommend";
import { InitData } from "@/types/DiscoverMusic/Recommend";
import bus from "vue3-eventbus";
import loading from "@/components/common/loading.vue";
import { useRouter } from "vue-router";
import useLogin from "@/hooks/useLogin";
const splitLine = defineAsyncComponent(
  () => import("components/private/splitLine.vue")
);
const sheetItem = defineAsyncComponent(
  () => import("components/private/sheetItem.vue")
);
const videoItem = defineAsyncComponent(
  () => import("components/private/videoItem.vue")
);
const newMusicItem = defineAsyncComponent(
  () => import("components/private/newMusicItem.vue")
);
const programItem = defineAsyncComponent(
  () => import("components/private/programItem.vue")
);

export default defineComponent({
  name: "Recommend",
  components: {
    loading,
    splitLine,
    sheetItem,
    videoItem,
    newMusicItem,
    programItem,
  },
  setup() {
    const data = reactive(new InitData());
    const bannerRef = ref();
    const router = useRouter();

    data.login = useLogin(false);

    // 页面跳转
    const toRecommend = () => {
      router.push("/RecommendSongs");
    };
    const toSheetDetail = (e: number) => {
      router.push("/SheetDetail?id=" + e);
    };
    const getSheet = () => {
      data.login = useLogin(false);
      getRecommendSheet({
        limit: 10,
      }).then((res: any) => {
        if (data.login) {
          data.sheetList = res.data.recommend.slice(0, 9);
        } else {
          data.sheetList = res.data.result;
        }
      });
    };

    // 播放音乐
    const playMusic = (e: number) => {
      let newData = data.newSongsList.map(item => item.song)
      bus.emit('playMusic', {
        data: newData,
        index: e
      })
    }

    getSheet()

    bus.on("windowResize", () => {
      if (bannerRef.value[0]) {
        data.bannerHeight = bannerRef.value[0].clientHeight;
      }
    });


    getBanner({
      type: 0,
    }).then((res: any) => {
      data.bannerList = res.data.banners;
    });

    getPrivateContent().then((res: any) => {
      data.privateList = res.data.result;
    });

    getNewSongs({
      limit: 12,
    }).then((res: any) => {
      data.newSongsList = res.data.result;
    });

    getRecommendMv().then((res: any) => {
      data.recommendMvList = res.data.result;
    });

    getRecommendProgram().then((res: any) => {
      data.programsList = res.data.programs;
    });

    return {
      ...toRefs(data),
      bannerRef,
      playMusic,
      toRecommend,
      toSheetDetail,
    };
  },
});
</script>

<style lang='less'>
#Recommend {
  .el-carousel {
    margin-bottom: 20px;
  }
  .el-carousel__item {
    border-radius: 8px;
    overflow: hidden;
    img {
      width: 100%;
    }
    .imageTarget {
      position: absolute;
      bottom: -1px;
      right: -1px;
      color: #fff;
      font-size: 12px;
      padding: 5px 12px;
      background-color: @themeColor;
      border-top-left-radius: 8px;
    }
  }
  .sheetContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
  }
  .privateContainer {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .newSongContainer {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .mvContainer {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .programContainer {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
}
</style>