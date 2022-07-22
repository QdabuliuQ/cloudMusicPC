<template>
  <div id="SearchVideos">
    <loading v-if="!videoList.length && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <div v-else class="videoContainer searchVideoContainer">
      <videoItem
        v-for="item in videoList"
        :key="item.vid"
        :imageUrl="item.coverUrl"
        :title="$highKey(item.title, router.currentRoute.value.query.key)"
        :artists="item.creator"
        :playCount="item.playTime"
        :duration="item.durationms"
        :centerIcon="true"
        :ratio="'2/1.1'"
      ></videoItem>
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
      "
    >
      <el-pagination
        v-if="total > 36"
        @current-change="pageChange"
        :current-page="offset"
        :page-size="36"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { getSearchData } from "@/network/SearchResult/searchResult";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SearchResult/SearchVideos";
import videoItem from "@/components/private/videoItem.vue";

export default defineComponent({
  name: "SearchVideos",
  components: {
    loading,
    emptyContent,
    videoItem,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());

    const pageChange = (e: number) => {
      window.scrollTo(0, 0);
      data.offset = e;
      getData();
    };
    const getData = () => {
      getSearchData({
        keywords: router.currentRoute.value.query.key as string,
        limit: 36,
        offset: (data.offset - 1) * 36,
        type: 1014,
      }).then((res: any) => {
        data.total = res.data.result.videoCount;
        data.videoList = res.data.result.videos;
      });
    };
    getData();

    return {
      router,
      pageChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#SearchVideos {
  .searchVideoContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr ;
    grid-gap: 20px;
  }
}
</style>