<template>
  <div id="SearchSheets">
    <loading v-if="!sheetList.length && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <tableList @itemClick='itemClick' :columns="columns" :data="sheetList" v-else>
      <template v-slot:coverImgUrl="{ content }">
        <div style="display:flex;align-items:center" class="sheetImage">
          <el-avatar
            shape="square"
            :size="60"
            :fit="'cover'"
            :src="content.coverImgUrl"
          />
        </div>
      </template>
      <template v-slot:name="{ content }">
        <div v-html="$highKey(content.name, router.currentRoute.value.query.key)" class="sheetName">
        </div>
      </template>
      <template v-slot:trackCount="{ content }">
        <div class="sheetInfo">{{content.trackCount}}首</div>
      </template>
      <template v-slot:creator="{ content }">
        <div class="sheetInfo">by：<span v-html="$highKey(content.creator.nickname, router.currentRoute.value.query.key)"></span></div>
      </template>
      <template v-slot:playCount="{ content }">
        <div class="sheetInfo">累计播放{{ $countFormat(content.playCount) }}次</div>
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
import { defineComponent, reactive, toRefs } from 'vue'
import tableList from "@/components/common/tableList.vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { getSearchData } from "@/network/SearchResult/searchResult";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SearchResult/SearchSheets";

export default defineComponent({
  name: 'SearchSheets',
  components: {
    tableList,
    loading,
    emptyContent,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData())

    const itemClick = (e: any) => {
      router.push('/SheetDetail?id='+e.id)
    }
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
        type: 1000,
      }).then((res: any) => {
        data.total = res.data.result.playlistCount;
        data.sheetList = res.data.result.playlists;
      });
    };
    getData();

    return {
      router,
      itemClick,
      pageChange,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#SearchSheets {
  .sheetInfo {
    color: @fontColor;
  }
}
</style>