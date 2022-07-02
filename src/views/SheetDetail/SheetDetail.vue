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
      ></detailPanel>
      <detailNav
        :routerKey="'sheetIndex'"
        :list="navList"
      ></detailNav>
    </div>
    <div style="margin-bottom: 30px">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { getSheetDetail } from "@/network/SheetDetail/SheetDetail";
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
    onMounted(() => {
      getSheetDetail({
        id: router.currentRoute.value.query.id as string,
      }).then((res: any) => {
        console.log(res);
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
    });
    return {
      ...toRefs(data),
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