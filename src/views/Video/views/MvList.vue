<template>
  <div id="MvList">
    <splitLine
      :title="'最新MV'"
      :path="'/MvAllList?order=2'"
      :icon="true"
    ></splitLine>
    <loading v-if="!newMvList.length"></loading>
    <div v-else class="mvContainer">
      <videoItem
        v-for="item in newMvList"
        :key="item.id"
        :type="'mv'"
        :id="item.id"
        :imageUrl="item.cover"
        :title="item.name"
        :artists="item.artists"
        :playCount="item.playCount"
        :centerIcon="true"
        :ratio="'2/1.2'"
      ></videoItem>
    </div>
    <splitLine
      :title="'热播MV'"
      :path="'/MvAllList?order=1'"
      :icon="true"
    ></splitLine>
    <loading v-if="!hotMvList.length"></loading>
    <div v-else class="mvContainer">
      <videoItem
        v-for="item in hotMvList"
        :key="item.id"
        :type="'mv'"
        :id="item.id"
        :imageUrl="item.cover"
        :title="item.name"
        :artists="item.artists"
        :playCount="item.playCount"
        :centerIcon="true"
        :ratio="'2/1.2'"
      ></videoItem>
    </div>
    <splitLine
      :title="'网易出品'"
      :path="'/MvAllList?type=4'"
      :icon="true"
    ></splitLine>
    <loading v-if="!wyMvList.length"></loading>
    <div v-else class="mvContainer">
      <videoItem
        v-for="item in wyMvList"
        :key="item.id"
        :type="'mv'"
        :id="item.id"
        :imageUrl="item.cover"
        :title="item.name"
        :artists="item.artists"
        :playCount="item.playCount"
        :centerIcon="true"
        :ratio="'2/1.2'"
      ></videoItem>
    </div>
    <splitLine :title="'MV排行榜'"></splitLine>
    <div class="cateList">
      <span
        @click="toggleItem(index)"
        :class="[rantCateIndex == index ? 'activeItem' : '']"
        v-for="(item, index) in rankCateList"
        :key="item"
      >
        {{ item }}
      </span>
    </div>
    <div class="mvRankContainer">
      <div
        class="mvRankItem"
        v-for="(item, index) in rankMvList"
        :key="item.id"
        @click="router.push('/MvPlay?id=' + item.id)"
      >
        <div class="itemIndex">
          <div>
            <div class="rank">
              {{ index + 1 < 10 ? "0" + (index + 1) : index + 1 }}
            </div>
            <div class="status">
              <img
                v-if="index + 1 < item.lastRank"
                src="~images/mvList/up.png"
                alt=""
              />
              <img
                v-else-if="index + 1 > item.lastRank"
                src="~images/mvList/down.png"
                alt=""
              />
              <span v-else>-</span>
            </div>
          </div>
        </div>
        <div class="itemImage">
          <div class="mask"></div>
          <div class="itemScore">
            <img src="~images/mvList/fire.png" alt="" />
            {{ item.score }}
          </div>
          <el-image
            style="width: 100%; height: 100%"
            shape="square"
            :fit="'cover'"
            :src="item.cover"
          />
        </div>
        <div class="itemInfo">
          <div class="itemName">{{ item.name }}</div>
          <div class="itemArt">
            <span @click.stop="router.push('/SingerDetail?id='+art.id)" v-for="art in item.artists" :key="art.id">
              {{ art.name }}&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import splitLine from "@/components/private/splitLine.vue";
import videoItem from "@/components/private/videoItem.vue";
import { getNewMv, getMvList, getMvRank } from "@/network/Video/mvList";
import { InitData } from "@/types/Video/MvList";
import loading from "@/components/common/loading.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MvList",
  components: {
    splitLine,
    videoItem,
    loading,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());
    // 切换排行榜
    const toggleItem = (e: number) => {
      data.rantCateIndex = e;
      getRankData();
    };
    // 获取排行榜数据
    const getRankData = () => {
      getMvRank({
        limit: 10,
        area:
          data.rantCateIndex == 0 ? "" : data.rankCateList[data.rantCateIndex],
        offset: 0,
      }).then((res: any) => {
        data.rankMvList = res.data.data;
      });
    };

    onMounted(() => {
      getNewMv({
        limit: 8,
      }).then((res: any) => {
        data.newMvList = res.data.data;
      });

      getMvList({
        area: "全部",
        order: "最热",
        type: "全部",
        limit: 8,
        offset: 0,
      }).then((res: any) => {
        data.hotMvList = res.data.data;
      });

      getMvList({
        area: "全部",
        order: "",
        type: "网易出品",
        limit: 8,
        offset: 0,
      }).then((res: any) => {
        data.wyMvList = res.data.data;
      });

      getRankData();
    });
    return {
      router,
      ...toRefs(data),
      toggleItem,
    };
  },
});
</script>

<style lang='less'>
#MvList {
  .mvContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 60px;
  }
  .cateList {
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    .activeItem {
      font-weight: bold;
      color: @themeColor !important;
    }
    span {
      margin-right: 30px;
      font-size: 14px;
      color: @fontColor;
      cursor: pointer;
      &:hover {
        color: var(--textColor);
      }
    }
  }
  .mvRankContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    .mvRankItem {
      cursor: pointer;
      display: flex;
      .itemIndex {
        width: 10%;
        display: flex;
        align-items: center;
        .rank {
          font-size: 24px;
          color: @fontColor;
          font-weight: bold;
        }
        .status {
          text-align: center;
          span {
            font-weight: bold;
            color: @fontColor;
            font-size: 18px;
          }
        }
      }
      .itemImage {
        width: 30%;
        cursor: pointer;
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        aspect-ratio: 2/1;
        .mask {
          width: 100%;
          height: 40px;
          position: absolute;
          top: 0;
          background-image: linear-gradient(rgba(0, 0, 0, 0.491), transparent);
        }
        .itemScore {
          right: 4px;
          top: 4px;
          position: absolute;
          font-size: 12px;
          display: flex;
          align-items: center;
          img {
            margin-right: 3px;
            width: 12px;
          }
        }
        .el-avatar {
          width: 100%;
          height: 5.7vw;
        }
      }
      .itemInfo {
        width: 65%;
        position: relative;
        display: flex;
        align-items: center;
        .itemName {
          position: absolute;
          top: 0;
          left: 15px;
          font-size: 13.5px;
          color: var(--textColor);
        }
        .itemArt {
          color: @fontColor;
          font-size: 12.5px;
          padding-left: 15px;
          cursor: pointer;
          width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          span {
            &:hover {
              color: var(--textColor);
            }
          }
        }
      }
    }
  }
}
</style>