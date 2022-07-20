<template>
  <div id="RecentVideos">
    <loading v-if="videoList.length == 0 && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <div v-else class="videoContainer">
      <videoItem
        v-for="item in videoList"
        :key="item.resourceId"
        :imageUrl="item.data.coverUrl"
        :title="item.data.name ? item.data.name : item.data.title"
        :duration="item.data.duration"
        :centerIcon="true"
        :creator="item.data.artists ? getName(item.data.artists) : item.data.creator.nickname"
        :ratio="'2/1.1'"
      ></videoItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { getRecentVideos } from "@/network/Recent/recent";
import { InitData } from "@/types/Recent/RecentVideos";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import videoItem from "@/components/private/videoItem.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RecentVideos",
  components: {
    loading,
    emptyContent,
    videoItem,
  },
  setup() {
    const data = reactive(new InitData());
    const router = useRouter()

    const toPage = (p: string) => {
      router.push(p)
    }
    const getName = (e: any) => {
      if (e && e.length) {
        let list = "";
        for (const item of e) {
          list += item.name + "  ";
        }
        return list;
      } else {
        return "";
      }
    };
    onMounted(() => {
      getRecentVideos().then((res: any) => {
        data.videoList = res.data.data.list;
        console.log(data.videoList);

        data.total = res.data.data.total;
      });
    });
    return {
      ...toRefs(data),
      getName,
      toPage,
    };
  },
});
</script>

<style lang='less'>
#RecentVideos {
  padding: 0 40px;
  .videoContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
  }
}
</style>