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
    <div class="sheetContainer">
      <sheetItem
        v-for="item in sheetList"
        :key="item.id"
        :imageUrl="item.picUrl"
        :title="item.name"
        :sum="item.playCount"
      ></sheetItem>
    </div>
    <splitLine :title="'独家放送'" :icon="true"></splitLine>
    <div class="privateContainer">
      <videoItem
        v-for="item in privateList"
        :key="item.id"
        :imageUrl="item.sPicUrl"
        :title="item.name"
        :topLeftIcon="true"
      ></videoItem>
    </div>
    <splitLine :title="'最新音乐'" :icon="true"></splitLine>
    <div class="newSongContainer">
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
    <div class="mvContainer">
      <videoItem
        v-for="item in recommendMvList"
        :key="item.id"
        :imageUrl="item.picUrl"
        :title="item.name"
        :artists="item.artists"
        :playCount="item.playCount"
        :topLeftIcon="false"
      ></videoItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";
import {
  getBanner,
  getRecommendSheet,
  getPrivateContent,
  getNewSongs,
  getRecommendMv
} from "@/network/recommend";
import { InitData } from "@/types/Recommend";
import splitLine from "components/private/splitLine.vue";
import sheetItem from "components/private/sheetItem.vue";
import videoItem from "components/private/videoItem.vue";
import newMusicItem from "components/private/newMusicItem.vue";
import bus from "vue3-eventbus";

export default defineComponent({
  name: "Recommend",
  components: {
    splitLine,
    sheetItem,
    videoItem,
    newMusicItem,
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
        limit: 9
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
        data.recommendMvList = res.data.result
      })
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
}
</style>