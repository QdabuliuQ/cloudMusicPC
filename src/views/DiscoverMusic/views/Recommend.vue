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
        v-for="item in sheetList"
        :key="item.id"
        :imageUrl="item.picUrl"
        :title="item.name"
        :sum="item.playCount"
        :imgHeight="'13vw'"
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
        :itemHeight="'12vw'"
      ></videoItem>
    </div>
    <splitLine :title="'最新音乐'" :icon="true"></splitLine>
    <loading v-if="!newSongsList.length"></loading>
    <div v-else class="newSongContainer">
      <newMusicItem
        v-for="item in newSongsList"
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
        :itemHeight="'8.5vw'"
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
  onMounted,
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
import loading from "@/components/common/loading.vue"
const splitLine = defineAsyncComponent(()=> import("components/private/splitLine.vue"))
const sheetItem = defineAsyncComponent(()=> import("components/private/sheetItem.vue"))
const videoItem = defineAsyncComponent(()=> import("components/private/videoItem.vue"))
const newMusicItem = defineAsyncComponent(()=> import("components/private/newMusicItem.vue"))
const programItem = defineAsyncComponent(()=> import("components/private/programItem.vue"))

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

    bus.on("windowResize", () => {
      data.bannerHeight = bannerRef.value[0].clientHeight;
    });

    onMounted(() => {
      getBanner({
        type: 0,
      }).then((res: any) => {
        data.bannerList = res.data.banners;
      });

      getRecommendSheet({
        limit: 9,
      }).then((res: any) => {
        data.sheetList = res.data.result;
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
    });
    return {
      ...toRefs(data),
      bannerRef,
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