<template>
  <div id="CollectAlbums">
    <loading v-if="albumList.length == 0 && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <div v-else>
      <div
        @click="router.push('/AlbumDetail?id=' + item.id)"
        v-for="item in albumList"
        :key="item.id"
        class="collectItem"
      >
        <el-avatar
          shape="square"
          :size="70"
          :fit="'cover'"
          :src="item.picUrl"
        />
        <div class="name">
          {{ item.name }}
          <span v-if="item.alias.length" v-for="(a, i) in item.alias"
            >({{ a }})&nbsp;&nbsp;</span
          >
        </div>
        <div class="creator">
          <span v-for="(a, i) in item.artists" :key="a.id">
            {{ a.name }}
          </span>
        </div>
        <div class="size">{{ item.size }}首</div>
      </div>
      <div class="pageContainer">
        <el-pagination
          v-if="total > limit"
          @current-change="pageChange"
          :current-page="offset"
          :page-size="limit"
          background
          layout="prev,pager, next"
          :total="total"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { getCollectAlbums } from "@/network/Collect/collect";
import { InitData } from "@/types/Collect/CollectAlbums";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CollectAlbums",
  components: {
    loading,
    emptyContent,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());

    const pageChange = (e: number) => {
      data.offset = e;
      getData();
    };
    const getData = () => {
      getCollectAlbums({
        limit: data.limit,
        offset: (data.offset - 1) * data.limit,
      }).then((res: any) => {
        data.total = res.data.count;
        data.albumList = res.data.data;
      });
    };

    onMounted(() => {
      getData();
    });
    return {
      router,
      ...toRefs(data),
      pageChange,
    };
  },
});
</script>

<style lang='less'>
#CollectAlbums {
  .pageContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .collectItem {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    &:nth-child(even) {
      background-color: var(--tableColor);
    }
    &:hover {
      background-color: var(--hoverColor);
    }
    .name {
      flex: 4;
      margin-left: 12px;
      span {
        color: @fontColor;
      }
    }
    .creator {
      flex: 2;
    }
    .size {
      flex: 1;
      text-align: center;
      color: @fontColor;
    }
  }
}
</style>