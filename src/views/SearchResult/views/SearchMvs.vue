<template>
  <div id="SearchMvs">
    <loading v-if="!mvList.length && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <div v-else class="searchMvContainer">
      <videoItem
        v-for="item in mvList"
        :key="item.id"
        :imageUrl="item.cover"
        :title="item.name"
        :artists="item.artists"
        :playCount="item.playCount"
        :duration="item.duration"
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
import { defineComponent, reactive, toRefs } from 'vue'
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { getSearchData } from "@/network/SearchResult/searchResult";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SearchResult/SearchMvs";
import videoItem from "@/components/private/videoItem.vue";

export default defineComponent({
  name: 'SearchMvs',
  components: {
    loading,
    emptyContent,
    videoItem,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData())
    
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
        type: 1004,
      }).then((res: any) => {
        console.log(res.data.result);
        data.total = res.data.result.mvCount;
        data.mvList = res.data.result.mvs;
      });
    };
    getData();

    return {
      pageChange,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#SearchMvs {
  .searchMvContainer {
    display: grid;
    grid-template-columns:repeat(4, 1fr);
    grid-gap: 20px;
  }
}
</style>