<template>
  <div id="RecentSheets">
    <loading v-if="sheetList.length == 0 && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <div v-else class="sheetContainer">
      <sheetItem
        v-for="item in sheetList"
        :imageUrl="item.data.coverImgUrl"
        :title="item.data.name"
        :id="item.data.id"
        :artist="item.data.creator.nickname"
        :artId="item.data.creator.userId"
        :type="'sheet'"
        :imgHeight="'12vw'"
        :key="item.resourceId"
      ></sheetItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import sheetItem from "@/components/private/sheetItem.vue";
import { InitData } from "@/types/Recent/RecentSheets";
import { getRecentSheets } from "@/network/Recent/recent";

export default defineComponent({
  name: "RecentSheets",
  components: {
    loading,
    emptyContent,
    sheetItem,
  },
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      getRecentSheets().then((res: any) => {
        console.log(res);
        data.sheetList = res.data.data.list;
        data.total = res.data.data.total;
      });
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#RecentSheets {
  padding: 0 40px;
  .sheetContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
}
</style>