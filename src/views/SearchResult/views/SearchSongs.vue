<template>
  <div id="SearchSongs">
    <loading v-if="!songList.length && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <div v-else>
      <musicList :data="songList" :columns="columns" :download="true">
        <template v-slot:name="{ content }">
          <div class="songName">
            {{ content.name }}
            <span v-for="(item, index) in content.alia" :key="index">
              ({{ item }})&nbsp;&nbsp;
            </span>
            <targetList
              :mv="content.mv"
              :origin="content.originCoverType == 1"
              :sq="content.sq"
              :vip="content.fee == 1"
            ></targetList>
            <!-- <img v-if="content.mv" src="~images/recommend/mvIcon.png" alt="" /> -->
          </div>
        </template>
        <template v-slot:ar="{ content }">
          <span
            class="infoItem clickItem"
            v-for="item in content.ar"
            :key="item.id"
            >{{ item.name }}&nbsp;&nbsp;</span
          >
        </template>
        <template v-slot:al="{ content }">
          <div class="infoItem clickItem">
            {{ content.al.name }}
          </div>
        </template>
        <template v-slot:dt="{ content }">
          <span class="infoItem">{{ $formatTime(content.dt) }}</span>
        </template>
      </musicList>
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
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, watch } from "vue";
import musicList from "@/components/common/musicList.vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { getSearchData } from "@/network/SearchResult/searchResult";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SearchResult/SearchSongs";
import targetList from "@/components/common/targetList.vue";

export default defineComponent({
  name: "SearchSongs",
  components: {
    musicList,
    loading,
    emptyContent,
    targetList,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());

    // 滚动刷新
    const pageChange = (e: number) => {
      data.offset = e
      window.scrollTo(0, 0)
      getData();
    };

    // 获取数据
    const getData = () => {
      getSearchData({
        keywords: router.currentRoute.value.query.key as string,
        limit: 30,
        offset: (data.offset - 1) * 30,
        type: 1,
      }).then((res: any) => {
        data.total = res.data.result.songCount;
        data.songList = res.data.result.songs;
      });
    };

    getData();
    
    watch(() => router.currentRoute.value.query.key, () => {
      data.offset = 1
      getData();
    })

    onMounted(() => {});
    return {
      pageChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#SearchSongs {
  .songName {
    width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
    span {
      color: @fontColor;
    }
  }
  .infoItem {
    width: 200px;
    color: @fontColor;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .clickItem {
    &:hover {
      color: #fff;
    }
  }
}
</style>