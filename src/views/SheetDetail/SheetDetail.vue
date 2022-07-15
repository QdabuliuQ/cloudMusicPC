<template>
  <div id="SheetDetail">
    <div class="topInfoContainer">
      <detailPanel
        style="margin-bottom: 30px"
        :picUrl="sheetInfo.coverImgUrl"
        :target="'歌单'"
        :name="sheetInfo.name"
        :avatarUrl="sheetInfo.creator.avatarUrl"
        :nickname="sheetInfo.creator.nickname"
        :subed="sheetInfo.subscribed"
        :subCount="sheetInfo.subscribedCount"
        :shareCount="sheetInfo.shareCount"
        :desc="sheetInfo.description"
        :tags="sheetInfo.tags"
        :count="sheetInfo.trackCount"
        :playCount="sheetInfo.playCount"
        :userId="sheetInfo.userId"
        @shareEvent="shareEvent"
      ></detailPanel>
      <detailNav :routerKey="'sheetIndex'" :list="navList"></detailNav>
    </div>
    <div style="margin-bottom: 30px">
      <router-view :key="routerId"></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  getCurrentInstance,
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  watch,
} from "vue";
import { getSheetDetail } from "@/network/SheetDetail/sheetDetail";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SheetDetail/SheetDetail";
import detailPanel from "@/components/common/detailPanel.vue";
import detailNav from "@/components/common/detailNav.vue";

export default defineComponent({
  name: "SheetDetail",
  components: {
    detailPanel,
    detailNav,
  },
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();
    const _this: any = getCurrentInstance();

    const shareEvent = () => {
      _this.proxy.$toShare(
        router.currentRoute.value.query.id,
        "playlist",
        data.sheetInfo.name,
        data.sheetInfo.coverImgUrl
      );
    };
    const getData = () => {
      getSheetDetail({
        id: data.routerId,
      }).then((res: any) => {
        data.sheetInfo = res.data.playlist;
        data.navList[0] = {
          name: `歌曲列表<span style='color: #949494; font-size: 12px'>(${data.sheetInfo.trackCount})</span>`,
          path: "/SheetSongs?id=" + router.currentRoute.value.query.id,
        };
        data.navList[1] = {
          name: `评论<span style='color: #949494; font-size: 12px'>(${data.sheetInfo.commentCount})</span>`,
          path: "/SheetComment?id=" + router.currentRoute.value.query.id,
        };
        data.navList[2] = {
          name: `收藏者<span style='color: #949494; font-size: 12px'>(${data.sheetInfo.subscribedCount})</span>`,
          path: "/SheetCollect?id=" + router.currentRoute.value.query.id,
        };
      });
    }

    watch(
      () => router.currentRoute.value.query.id,
      (n) => {
        data.routerId = n as string
        getData()
      },
      { immediate: true }
    );

    onMounted(() => {
      data.routerId = router.currentRoute.value.query.id as string
      getData()
      
    });
    return {
      ...toRefs(data),
      shareEvent,
    };
  },
});
</script>

<style lang='less'>
#SheetDetail {
  .topInfoContainer {
    padding: 40px 40px 20px;
  }
}
</style>