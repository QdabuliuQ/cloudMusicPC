<template>
  <div id="NewDisc">
    <div class="typeContainer">
      <span
        @click="ItemClick(index)"
        :class="[areaIndex == index ? 'activeItem' : '']"
        v-for="(item, index) in areaList"
        :key="item.id"
        >{{ item.name }}</span
      >
    </div>
    <loading v-if="!discList.length"></loading>
    <div v-else :infinite-scroll-disabled="disableScroll" :infinite-scroll-immediate="false" :infinite-scroll-delay="700" v-infinite-scroll="loadDiscData" class="discContainer">
      <sheetItem
        v-for="(item, index) in discList"
        :imageUrl="item.blurPicUrl"
        :title="item.name"
        :artist="item.artist.name"
        :artId="item.artist.id"
      ></sheetItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { getNewDisc } from "@/network/DiscoverMusic/newDisc";
import { InitData } from "@/types/DiscoverMusic/NewDisc";
import sheetItem from "@/components/private/sheetItem.vue";
import loading from "@/components/common/loading.vue"

export default defineComponent({
  name: "NewDisc",
  components: {
    sheetItem,
    loading
  },
  setup() {
    const data = reactive(new InitData());
    const newDiscData = (limit: number, offset: number) => {
      getNewDisc({
        limit,
        offset: offset * limit,
        area: data.areaList[data.areaIndex].id,
      }).then((res: any) => {
        if (res.data.albums.length) {
          data.discList = [...data.discList, ...res.data.albums];
        } else {
          data.disableScroll = true
        }
      });
    };
    // 切换类型
    const ItemClick = (e: number) => {
      data.areaIndex = e;
      data.currentPage = 0
      data.discList = []
      data.disableScroll = false
      newDiscData(18, data.currentPage);
    };
    // 滚动加载
    const loadDiscData = () => {
      data.currentPage ++
      newDiscData(18, data.currentPage);
    }
    onMounted(() => {
      newDiscData(18, data.currentPage);
    });
    return {
      ...toRefs(data),
      ItemClick,
      loadDiscData,
    };
  },
});
</script>

<style lang='less'>
#NewDisc {
  .typeContainer {
    display: flex;
    align-items: center;
    margin: 20px 0 10px;
    .activeItem {
      color: @themeColor !important;
      opacity: 1 !important;
    }
    span {
      color: #fff;
      opacity: 0.5;
      cursor: pointer;
      margin-right: 30px;
      margin-bottom: 10px;
      font-size: 13px;
      &:hover {
        opacity: 1;
      }
    }
  }
  .discContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
  }
}
</style>