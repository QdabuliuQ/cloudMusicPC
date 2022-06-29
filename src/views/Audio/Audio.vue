<template>
  <div id="Audio">
    <el-carousel
      type="card"
      v-if="bannerList.length"
      :height="bannerHeight + 'px'"
      indicator-position="outside"
    >
      <el-carousel-item v-for="item in bannerList" :key="item">
        <img ref="bannerRef" :src="item.pic" alt="" />
      </el-carousel-item>
    </el-carousel>
    <loading v-else></loading>
    <splitLine :title="'电台分类'"></splitLine>
    <loading v-if="!cateList.length"></loading>
    <div v-else class="categoryList">
      <div @click="toPage(item.id, item.name)" class="cateItem" v-for="item in cateList" :key="item.name">
        <div class="itemIcon">
          <img :src="item.pic84x84IdUrl" alt="" />
        </div>
        <div>
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="audioListContainer">
      <loading v-if="!audioRecommendList.length"></loading>
      <div v-else style="margin-right: 30px" class="listItem">
        <splitLine :title="'推荐节目'"></splitLine>
        <div class="listBox">
          <audioListItem
            v-for="item in audioRecommendList"
            :key="item.id"
            :picUrl="item.picUrl"
            :name="item.name"
            :copywriter="item.copywriter"
            :category="item.category"
          ></audioListItem>
        </div>
      </div>
      <loading v-if="!audioRankList.length"></loading>
      <div v-else class="listItem">
        <splitLine :title="'节目排行榜'"></splitLine>
        <div class="listBox">
          <audioListItem
            v-for="item in audioRankList"
            :key="item.program.id"
            :picUrl="item.program.coverUrl"
            :name="item.program.name"
            :copywriter="item.program.radio.name"
            :rank="item.rank"
            :lastRank="item.lastRank"
            :score="item.score"
          ></audioListItem>
        </div>
      </div>
    </div>
    <loading v-if="!audioRecommendCate.length"></loading>
    <div v-else class="audioRecommend">
      <div
        v-for="(item, index) in audioRecommendCate"
        :key="index"
        class="recommendItem"
      >
        <splitLine :icon="true" :path="'/AudioList?cateId='+item.categoryId+'&name='+item.categoryName" :title="item.categoryName + '&nbsp;·&nbsp;电台'"></splitLine>
        <div class="audioList">
          <div v-for="audio in item.radios" :key="audio.id" class="audioItem">
            <div class="image">
              <el-avatar shape="square" :size="100" :fit="'cover'" :src="audio.picUrl" />
            </div>
            <div class="info">
              <div class="name">{{audio.name}}</div>
              <div class="text">{{audio.rcmdText}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";
import {
  getDjBanner,
  getDjCategory,
  getDjRecommend,
  getDjRank,
  getRecommendCate,
} from "@/network/Audio/audio";
import { InitData } from "@/types/Audio/Audio";
import bus from "vue3-eventbus";
import loading from "@/components/common/loading.vue";
import splitLine from "@/components/private/splitLine.vue";
import audioListItem from "./audioListItem.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Audio",
  components: {
    loading,
    splitLine,
    audioListItem,
  },
  setup() {
    const data = reactive(new InitData());
    const bannerRef = ref();
    const router = useRouter()

    const toPage = (e:number, name: string) => {
      router.push('/AudioList?cateId='+e+'&name='+name)
    }

    bus.on("windowResize", () => {
      data.bannerHeight = bannerRef.value[0].clientHeight;
    });

    onMounted(() => {
      getDjBanner().then((res: any) => {
        data.bannerList = res.data.data;
        setTimeout(() => {
          data.bannerHeight = bannerRef.value[0].clientHeight;
        }, 700);
      });

      getDjCategory().then((res: any) => {
        data.cateList = res.data.categories;
      });

      getDjRecommend().then((res: any) => {
        data.audioRecommendList = res.data.djRadios;
      });

      getDjRank({ limit: 10, offset: 0 }).then((res: any) => {
        data.audioRankList = res.data.toplist;
      });

      getRecommendCate().then((res: any) => {
        data.audioRecommendCate = res.data.data;
      });
    });
    return {
      ...toRefs(data),
      bannerRef,
      toPage
    };
  },
});
</script>

<style lang='less'>
#Audio {
  padding: 30px 120px;
  .el-carousel__item {
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
  .categoryList {
    margin-bottom: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
    .cateItem {
      text-align: center;
      cursor: pointer;
      font-size: 13px;
      border-radius: 8px;
      padding-bottom: 12px;
      &:hover {
        background-color: @hoverColor;
      }
      img {
        width: 60px;
      }
    }
  }
  .audioListContainer {
    display: flex;
    margin-bottom: 50px;
    .listItem {
      flex: 1;
      .listBox {
        border-top: 1px solid @themeColor;
        border-left: 1px solid #5a5a5a;
        border-right: 1px solid #5a5a5a;
        border-bottom: 1px solid #5a5a5a;
      }
    }
  }
  .recommendItem {
    margin-bottom: 30px;
    .audioList {
      border-top: 2px solid @themeColor;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 20px;
      padding-top: 10px;
      .audioItem {
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: 8px;
        &:hover {
          background: @hoverColor;
        }
        .image {
          display: flex;
          align-items: center;
        }
        .info {
          margin-left: 15px;
          .text {
            margin-top: 15px;
            font-size: 13px;
            color: @fontColor;
          }
        }
      }
    }
  }
}
</style>