<template>
  <div id="RankingList">
    <div class="officalListContainer">
      <div class="titleContent">官方榜</div>
      <loading v-if="!officalList.length"></loading>
      <div v-else class="officalItem" v-for="(item, index) in officalList">
        <div class="leftImage">
          <img class="icon" src="~images/common/sheetPlay.png" alt="" />
          <img class="image" :src="item.coverImgUrl" alt="" />
        </div>
        <div class="rightMusic">
          <div class="musicList">
            <div
              class="musicItem"
              v-for="(music, index2) in item.tracks"
              :key="index2"
            >
              <div class="itemIndex">{{ index2 + 1 }}</div>
              <div class="itemInfo">
                <div>{{ music.first }}</div>
                <div style="color: #a3a3a3">by {{ music.second }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="globaListContainer">
      <div class="titleContent">全球榜</div>
      <loading v-if="!globaList.length"></loading>
      <div v-else class="globaListContent">
        <sheetItem 
        v-for="item,index in globaList" 
        :key="item.id"
        :imageUrl="item.coverImgUrl"
        :title="item.name"
        :sum="item.playCount"
        :imgHeight="'13vw'">
        </sheetItem>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { getRankingList } from "@/network/DiscoverMusic/rankingList";
import { InitData } from "@/types/DiscoverMusic/RankingList";
import sheetItem from "@/components/private/sheetItem.vue";
import loading from "@/components/common/loading.vue"

export default defineComponent({
  name: "RankingList",
  components: {
    sheetItem,
    loading
  },
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      getRankingList().then((res: any) => {
        for (const item of res.data.list) {
          if (item.tracks.length) {
            data.officalList.push(item);
          } else {
            data.globaList.push(item);
          }
        }
      });
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#RankingList {
  .titleContent {
    color: #fff;
    font-weight: bold;
    font-size: 23px;
    margin-bottom: 15px;
  }
  .officalListContainer {
    margin-bottom: 30px;
    .officalItem {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      .leftImage {
        width: 15%;
        margin-right: 30px;
        position: relative;
        cursor: pointer;
        &:hover .icon {
          opacity: 1;
        }
        .image {
          width: 100%;
          border-radius: 8px;
          cursor: pointer;
        }
        .icon {
          transition: 0.2s all linear;
          opacity: 0;
          position: absolute;
          width: 30%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .rightMusic {
        width: 82%;
        .musicList {
          background: rgb(58, 58, 58);
          border-radius: 8px;
        }
        .musicItem {
          display: flex;
          font-size: 13.5px;
          padding: 10px 18px;

          .itemIndex {
            width: 3%;
            color: @themeColor;
            font-weight: bold;
          }
          .itemInfo {
            width: 97%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #fff;
          }
        }
      }
    }
  }
  .globaListContainer {
    .globaListContent {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 15px;
    }
  }
}
</style>