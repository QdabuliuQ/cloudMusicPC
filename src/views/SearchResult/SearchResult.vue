<template>
  <div id="SearchResult">
    <detailNav :routerKey="'searchIndex'" :list="navList"></detailNav>
    <div class="routerView">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import detailNav from "@/components/common/detailNav.vue";
import { InitData } from "@/types/SearchResult/SearchResult";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SearchResult",
  components: {
    detailNav,
  },
  setup() {
    const router = useRouter()
    const data = reactive(new InitData());
    let key: string = router.currentRoute.value.query.key as string
    data.navList = [
      { name: "单曲", path: "/SearchSongs?key="+key },
      { name: "歌手", path: "/SearchSingers?key="+key },
      { name: "专辑", path: "/SearchAlbums?key="+key },
      { name: "视频", path: "/SearchVideos?key="+key },
      { name: "MV", path: "/SearchMvs?key="+key },
      { name: "歌单", path: "/SearchSheets?key="+key },
      { name: "歌词", path: "/SearchTexts?key="+key },
      { name: "播客", path: "/SearchAudios?key="+key },
      { name: "用户", path: "/SearchUsers?key="+key },
    ];

    onMounted(() => {});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#SearchResult {
  padding: 30px;
  .routerView {
    margin-top: 25px;
  }
}
</style>