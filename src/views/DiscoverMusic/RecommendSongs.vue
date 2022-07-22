<template>
  <div id="RecommendSongs">
    <div class="topContainer">
      <div class="leftIcon">
        <img src="~images/recommend/calendar_red.png" alt="" />
        <span>{{ day }}</span>
      </div>
      <div class="rightInfo">
        <div class="topInfo">每日歌曲推荐</div>
        <div class="bottomInfo">根据你的音乐口味生成，每天6:00更新</div>
      </div>
    </div>
    <loading v-if="!songList.length && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <musicList v-else :columns="columns" :data="songList" :download="true">
      <template v-slot:name="{ content }">
        <div style="display: flex; align-items: center">
          {{ content.name }}
          <targetList
            :mv="content.mv"
            :sq="content.sq"
            :vip="content.fee == 1"
          ></targetList>
        </div>
      </template>
      <template v-slot:ar="{ content }">
        <span class="tItem" v-for="item in content.ar" :key="item.id">
          {{ item.name }}
        </span>
      </template>
      <template v-slot:al="{ content }">
        <div class="tItem">
          {{ content.al.name }}
        </div>
      </template>
      <template v-slot:dt="{ content }">
        <div class="tItem">
          {{ $formatTime(content.dt) }}
        </div>
      </template>
    </musicList>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { InitData } from "@/types/DiscoverMusic/RecommendSongs";
import musicList from "@/components/common/musicList.vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { getRecommendSongs } from "@/network/DiscoverMusic/recommend";
import targetList from "@/components/common/targetList.vue";

export default defineComponent({
  name: "RecommendSongs",
  components: {
    musicList,
    loading,
    emptyContent,
    targetList,
  },
  setup() {
    const data = reactive(new InitData());
    getRecommendSongs().then((res: any) => {
      data.songList = res.data.data.dailySongs;
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#RecommendSongs {
  padding: 30px;
  .topContainer {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .leftIcon {
      margin-right: 15px;
      position: relative;
      span {
        position: absolute;
        top: 61%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-size: 27px;
        color: @themeColor;
      }
      img {
        width: 120px;
      }
    }
    .topInfo {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 8px;
    }
    .bottomInfo {
      font-size: 13px;
      color: @fontColor;
    }
  }
  .tItem {
    color: @fontColor;
    &:hover {
      color: #fff;
    }
  }
}
</style>