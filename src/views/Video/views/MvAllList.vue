<template>
  <div id="MvAllList">
    <div class="pageTitle">全部MV</div>
    <div class="cateBox">
      <div class="cateItem">
        <div class="itemTitle">地区：</div>
        <div class="itemContainer">
          <span
            @click="itemClick('area', index)"
            :class="[areaIndex == index ? 'activeItem' : '']"
            v-for="(item, index) in areaCate"
            :key="item"
            >{{ item }}</span
          >
        </div>
      </div>
      <div class="cateItem">
        <div class="itemTitle">类型：</div>
        <div class="itemContainer">
          <span
            @click="itemClick('type', index)"
            :class="[typeIndex == index ? 'activeItem' : '']"
            v-for="(item, index) in typeCate"
            :key="item"
            >{{ item }}</span
          >
        </div>
      </div>
      <div class="cateItem">
        <div class="itemTitle">排序：</div>
        <div class="itemContainer">
          <span
            @click="itemClick('order', index)"
            :class="[orderIndex == index ? 'activeItem' : '']"
            v-for="(item, index) in orderCate"
            :key="item"
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
    <loading v-if="!mvList.length"></loading>
    <div
      v-else
      :infinite-scroll-disabled="disableScroll"
      :infinite-scroll-delay="700"
      :infinite-scroll-immediate="false"
      v-infinite-scroll="loadVideoData"
      class="videoContainer"
    >
      <videoItem
        v-for="item in mvList"
        :key="item.id"
        :title="item.name"
        :artists="item.artists"
        :imageUrl="item.cover"
        :playCount="item.playCount"
        :itemHeight="'10vw'"
        :duration="item.duration"
      ></videoItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/Video/MVAllList";
import videoItem from "@/components/private/videoItem.vue";
import { getMvList } from "@/network/Video/mvList";
import loading from "@/components/common/loading.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MvAllList",
  components: {
    videoItem,
    loading,
  },
  props: ["order", "type"],
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();
    // 切换类型
    const itemClick = (s: string, e: number) => {
      switch (s) {
        case "area":
          data.areaIndex = e;
          break;
        case "type":
          data.typeIndex = e;
          break;
        case "order":
          data.orderIndex = e;
          break;
      }
      data.mvList = [];
      data.offset = 0;
      data.disableScroll = false;
      getVideoData();
    };
    // 获取数据
    const getVideoData = () => {
      getMvList({
        area: data.areaIndex == 0 ? "" : data.areaCate[data.areaIndex],
        order: data.orderIndex == 0 ? "" : data.orderCate[data.orderIndex],
        type: data.typeIndex == 0 ? "" : data.typeCate[data.typeIndex],
        limit: 20,
        offset: data.offset * 20,
      }).then((res: any) => {
        if (res.data.data.length) {
          data.offset++;
          data.mvList = [...data.mvList, ...res.data.data];
        } else {
          data.disableScroll = true
        }
      });
    };
    // 滚动加载
    const loadVideoData = () => {
      getVideoData()
    };

    onMounted(() => {
      let r = router.currentRoute.value.query;
      if (r.order) {
        data.orderIndex = parseInt(r.order as string);
      } else if (r.type) {
        data.typeIndex = parseInt(r.type as string);
      }

      getVideoData();
    });
    return {
      ...toRefs(data),
      itemClick,
      loadVideoData,
    };
  },
});
</script>

<style lang='less'>
#MvAllList {
  padding: 30px 120px;
  .pageTitle {
    font-size: 22px;
    font-weight: bold;
    color: @fontColor;
  }
  .cateBox {
    margin: 25px 0;
  }
  .cateItem {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 13.5px;
    .activeItem {
      color: @themeColor !important;
      opacity: 1 !important;
    }
    .itemTitle {
      width: 5%;
      color: #fff;
    }
    .itemContainer {
      width: 94%;
      display: flex;
      flex-wrap: wrap;
      span {
        color: #fff;
        opacity: 0.5;
        cursor: pointer;
        margin-right: 30px;
        margin-bottom: 10px;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .videoContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
}
</style>