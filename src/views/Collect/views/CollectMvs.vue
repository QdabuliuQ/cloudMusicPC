<template>
  <div id="CollectVideos">
    <loading v-if="mvList.length == 0 && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <div v-else class="mvContainer">
      <videoItem
        v-for="item in mvList"
        :key="item.vid"
        :id="item.vid"
        :type="item.type==0?'mv':'video'"
        :imageUrl="item.coverUrl"
        :title="
          item.type == 0
            ? `<span style='font-size:12px;font-weight:bold;padding:5px 10px 7px;border:1px solid #ec4141; zoom: 0.6; margin-right: 10px; color: #ec4141'>MV</span>${item.title}`
            : item.title
        "
        :centerIcon="true"
        :playCount="item.playTime"
        :duration="item.durationms"
        :creator="item.creator.name"
        :ratio="'2/1.1'"
      ></videoItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import videoItem from "@/components/private/videoItem.vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { InitData } from "@/types/Collect/CollectMvs";
import { getCollectMvs } from "@/network/Collect/collect";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CollectMvs",
  components: {
    videoItem,
    loading,
    emptyContent,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());

    const getData = () => {
      getCollectMvs({
        limit: 999,
        offset: (data.offset - 1) * 999,
      }).then((res: any) => {
        data.total = res.data.count
        data.mvList = res.data.data;
      });
    };
    onMounted(() => {
      getData();
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#CollectVideos {
  .mvContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
}
</style>