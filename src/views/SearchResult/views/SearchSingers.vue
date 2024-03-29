<template>
  <div id="SearchSingers">
    <loading v-if="!singerList.length && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <tableList :columns="columns" :data="singerList" v-else>
      <template v-slot:img1v1Url="{ content }">
        <div class="singerImage">
          <el-avatar
            shape="square"
            :size="60"
            :fit="'cover'"
            :src="content.img1v1Url"
          />
        </div>
      </template>
      <template v-slot:name="{ content }">
        <div class="singerName">
          <span v-html="$highKey(content.name, router.currentRoute.value.query.key)"></span>
          <span v-for="(item, index) in content.alias" :key="index">
            ({{ item }})
          </span>
        </div>
      </template>
      <template v-slot:mvSize="{ content }">
        <div class="singerInfo">MV：{{ content.mvSize }}</div>
      </template>
      <template v-slot:albumSize="{ content }">
        <div class="singerInfo">专辑：{{ content.mvSize }}</div>
      </template>
    </tableList>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
      "
    >
      <el-pagination
        v-if="total > 30"
        @current-change="pageChange"
        :current-page="offset"
        :page-size="30"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import tableList from "@/components/common/tableList.vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { getSearchData } from "@/network/SearchResult/searchResult";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SearchResult/SearchSingers";

export default defineComponent({
  name: "SearchSingers",
  components: {
    tableList,
    loading,
    emptyContent,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());
    
    const pageChange = (e: number) => {
      window.scrollTo(0,0)
      data.offset = e
      getData()
    }
    const getData = () => {
      getSearchData({
        keywords: router.currentRoute.value.query.key as string,
        limit: 30,
        offset: (data.offset - 1) * 30,
        type: 100,
      }).then((res: any) => {
        data.total = res.data.result.artistCount;
        data.singerList = res.data.result.artists;
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
#SearchSingers {
  .singerImage {
    display: flex;
    align-items: center;
  }
  .singerName {
    display: flex;
    align-items: center;
    span {
      color: @fontColor;
      font-size: 13px;
      margin-right: 4px;
    }
  }
  .singerInfo {
    color: @fontColor;
    text-align: center;
  }
}
</style>