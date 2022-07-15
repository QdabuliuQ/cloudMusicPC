<template>
  <div id="CollectSingers">
    <loading v-if="singerList.length == 0 && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <div v-else>
      <div v-for="item in singerList" :key="item.id" class="collectItem">
        <el-avatar
          shape="square"
          :size="70"
          :fit="'cover'"
          :src="item.img1v1Url"
        />
        <div class="name">
          {{ item.name }}
          <span v-if="item.alias.length" v-for="(a, i) in item.alias"
            >({{ a }})&nbsp;&nbsp;</span
          >
        </div>
        <div class="size">专辑：{{ item.albumSize }}</div>
        <div class="size">MV：{{ item.mvSize }}</div>
      </div>
      <div class="pageContainer">
        <el-pagination
          v-if="total > (limit-1)"
          @current-change="pageChange"
          :current-page="offset"
          :page-size="limit - 1"
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
import { getCollectSingers } from "@/network/Collect/collect";
import { InitData } from "@/types/Collect/CollectSingers";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";

export default defineComponent({
  name: "CollectSingers",
  components: {
    loading,
    emptyContent,
  },
  setup() {
    const data = reactive(new InitData());
    const pageChange = (e: number) => {
      data.offset = e
      getData()
    }

    const getData = () => {
      getCollectSingers({
        limit: data.limit,
        offset: (data.offset - 1) * data.limit,
      }).then((res: any) => {
        if (res.data.count) {
          data.total = res.data.count;
        }
        data.singerList = res.data.data;
      });
    };

    onMounted(() => {
      getData();
    });
    return {
      pageChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#CollectSingers {
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
      background-color: #2c2c2c;
    }
    &:hover {
      background-color: @hoverColor;
    }
    .name {
      flex: 4;
      margin-left: 12px;
      span {
        color: @fontColor;
      }
    }
    .size {
      flex: 1;
      font-size: 13px;
      text-align: center;
      color: @fontColor;
    }
  }
}
</style>