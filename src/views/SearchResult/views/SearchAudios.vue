<template>
  <div id="SearchAudios">
    <loading v-if="!audioList.length && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <tableList @itemClick='itemClick' :columns="columns" :data="audioList" v-else>
      <template v-slot:picUrl="{ content }">
        <div class="audioImage">
          <el-avatar
            shape="square"
            :size="60"
            :fit="'cover'"
            :src="content.picUrl"
          />
        </div>
      </template>
      <template v-slot:name="{ content }">
        <div v-html="$highKey(content.name, router.currentRoute.value.query.key)" class="audioName">
        </div>
      </template>
      <template v-slot:playCount="{ content }">
        <div class="audioInfo"><img src="~images/recommend/playLine.png" alt="">{{ $countFormat(content.playCount) }}</div>
      </template>
      <template v-slot:programCount="{ content }">
        <div class="audioInfo">声音 {{ content.programCount }}</div>
      </template>
      <template v-slot:dj="{ content }">
        <div @click.stop="router.push('/UserDetail?id='+content.dj.userId)" class="audioInfo audioCreator">by <span v-html="$highKey(content.dj.nickname, router.currentRoute.value.query.key)"></span></div>
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
import { InitData } from "@/types/SearchResult/SearchAudios";

export default defineComponent({
  name: 'SearchAudios',
  components: {
    tableList,
    loading,
    emptyContent,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData())

    const itemClick = (e: any) => {
      router.push('/AudioDetail?audioId='+e.id)
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
        type: 1009,
      }).then((res: any) => {
        data.total = res.data.result.djRadiosCount;
        data.audioList = res.data.result.djRadios;
      });
    };

    getData()
    return {
      router,
      pageChange,
      itemClick,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#SearchAudios {
  .audioImage {
    display: flex;
    align-items: center;
  }
  .audioName {
    font-size: 14px;
  }
  .audioInfo {
    font-size: 12px;
    display: flex;
    align-content: center;
    color: @fontColor;
    img {
      width: 13px;
      opacity: 0.7;
      margin-right: 5px;
    }
  }
  .audioCreator {
    &:hover {
      color: #fff;
    }
  }
}
</style>