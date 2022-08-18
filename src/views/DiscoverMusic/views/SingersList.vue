<template>
  <div id="SingersList">
    <div class="categoryContainer">
      <div class="categoryBox">
        <div class="cateItem">
          <div class="itemTitle">语种：</div>
          <div class="itemContainer">
            <span
              @click="ItemClick('lang', index)"
              :class="[langIndex == index ? 'activeItem' : '']"
              v-for="(item, index) in languageList"
              :key="item.id"
              >{{ item.name }}</span
            >
          </div>
        </div>
        <div class="cateItem">
          <div class="itemTitle">分类：</div>
          <div class="itemContainer">
            <span
              @click="ItemClick('type', index)"
              :class="[cateIndex == index ? 'activeItem' : '']"
              v-for="(item, index) in typeList"
              :key="item.id"
              >{{ item.name }}</span
            >
          </div>
        </div>
        <div class="cateItem">
          <div class="itemTitle">筛选：</div>
          <div class="itemContainer">
            <span
              @click="ItemClick('char', index)"
              :class="[charIndex == index ? 'activeItem' : '']"
              v-for="(item, index) in charList"
              :key="item.id"
              >{{ item.name }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <loading v-if="!singerList.length"></loading>
    <div
      v-else
      :infinite-scroll-disabled="isDisableScroll"
      :infinite-scroll-immediate="false"
      :infinite-scroll-delay="700"
      v-infinite-scroll="loadMoreData"
      class="singersContainer"
    >
      <div
        @click="router.push('/SingerDetail?id='+item.id)"
        class="singerItem"
        v-for="(item, index) in singerList"
        :key="item.id"
      >
        <div style="width: 100%; aspect-ratio: 1/1;">
          <el-avatar style="border-radius: 12px;width: 100%;height: 100%" shape="square" :fit="'cover'" :src="item.img1v1Url" />
        </div>
        <div style="margin-top: 3px">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/DiscoverMusic/SingersList";
import { getSingerList } from "@/network/DiscoverMusic/singersList";
import loading from "@/components/common/loading.vue"
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SingersList",
  setup() {
    const router = useRouter()
    const data = reactive(new InitData());
    // 获取歌手列表
    const singersList = (
      type: string | number,
      area: string | number,
      initial: string | number
    ) => {
      getSingerList({
        type,
        area,
        initial,
        offset: data.offset * 18,
        limit: 60,
      }).then((res: any) => {
        if (res.data.artists.length) {
          data.singerList = [...data.singerList, ...res.data.artists];
        } else {
          data.isDisableScroll = true;
        }
      });
    };
    // 滚动加载更多
    const loadMoreData = () => {
      data.offset++;
      singersList(
        data.typeList[data.cateIndex].id,
        data.languageList[data.langIndex].id,
        data.charList[data.charIndex].id
      );
    };
    // 切换歌手类型
    const ItemClick = (s: string, e: number) => {
      switch (s) {
        case "lang":
          if (data.langIndex == e) return
          data.langIndex = e;
          break;
        case "type":
          if (data.cateIndex == e) return
          data.cateIndex = e;
          break;
        case "char":
          if (data.charIndex == e) return
          data.charIndex = e;
          break;
      }
      data.offset = 0  // 清空页码
      data.singerList = []  // 清空数据列表
      data.isDisableScroll = false
      // 获取歌手列表
      singersList(
        data.typeList[data.cateIndex].id,
        data.languageList[data.langIndex].id,
        data.charList[data.charIndex].id
      );
    };
    onMounted(() => {
      singersList(
        data.typeList[data.cateIndex].id,
        data.languageList[data.langIndex].id,
        data.charList[data.charIndex].id
      );
    });
    return {
      router,
      ...toRefs(data),
      loadMoreData,
      ItemClick,
    };
  },
  components: {
    loading
  }
});
</script>

<style lang='less'>
#SingersList {
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
      width: 7%;
      color: var(--textColor);
    }
    .itemContainer {
      width: 92%;
      display: flex;
      flex-wrap: wrap;
      span {
        color: var(--textColor);
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
  .singersContainer {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    .singerItem {
      color: var(--textColor);
      font-size: 13.5px;
      cursor: pointer;
      margin-bottom: 15px;
      img {
        width: 100%;
        border-radius: 8px;
      }
    }
  }
}
</style>