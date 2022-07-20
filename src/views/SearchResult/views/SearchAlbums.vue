<template>
  <div id="SearchAlbums">
    <loading v-if="!albumList.length && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <tableList :columns="columns" :data="albumList" v-else>
      <template v-slot:picUrl="{ content }">
        <div class="albumImage">
          <el-avatar
            shape="square"
            :size="60"
            :fit="'cover'"
            :src="content.picUrl"
          />
        </div>
      </template>
      <template v-slot:name="{ content }">
        <div class="albumName">
          {{ content.name }}&nbsp;&nbsp;
          <span v-if="content.transNames" v-for="item,index in content.transNames">
            ({{item}})
          </span>
        </div>
      </template>
      <template v-slot:artists="{ content }">
        <div class="creator">
          <span v-for="item in content.artists" :key="item.id">
            {{item.name}}
          </span>
        </div>
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
import { InitData } from "@/types/SearchResult/SearchAlbums";

export default defineComponent({
  name: 'SearchAlbums',
  components: {
    tableList,
    loading,
    emptyContent,
  },
  setup() {
    const router = useRouter()
    const data = reactive(new InitData())

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
        type: 10,
      }).then((res: any) => {
        data.total = res.data.result.albumCount;
        data.albumList = res.data.result.albums;
      });
    }
    getData()

    return {
      ...toRefs(data),
      pageChange
    }
  }
})
</script>

<style lang='less'>
#SearchAlbums {
  .albumName {
    display: flex;
    align-items: center;
    margin-left: 10px;
    span {
      margin-right: 5px;
      color: @fontColor;
    }
  }
  .creator {
    font-size: 13px;
    color: @fontColor;
    span {
      margin-right: 5px;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>