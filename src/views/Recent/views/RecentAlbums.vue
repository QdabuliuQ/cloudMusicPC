<template>
  <div id="RecentAlbums">
    <loading v-if="albumList.length == 0 && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import sheetItem from "@/components/private/sheetItem.vue";
import { InitData } from "@/types/Recent/RecentAlbums";
import { getRecentAlbums } from "@/network/Recent/recent";

export default defineComponent({
  name: 'RecentAlbums',
  components: {
    loading,
    emptyContent,
    sheetItem,
  },
  setup() {
    const data = reactive(new InitData())
    onMounted(() => {
      getRecentAlbums().then((res: any) => {
        console.log(res);
        data.total = res.data.data.total
      })
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#RecentAlbums {
  padding: 0 40px;
}
</style>