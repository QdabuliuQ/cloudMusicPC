<template>
  <div id="AudioDetail">
    <loading v-if="audioDetail.picUrl == ''"></loading>
    <detailPanel
      v-else
      style="margin-bottom: 30px"
      :picUrl="audioDetail.picUrl"
      :target="'播客'"
      :name="audioDetail.name"
      :avatarUrl="audioDetail.dj.avatarUrl"
      :nickname="audioDetail.dj.nickname"
      :subed="audioDetail.subed"
      :subCount="audioDetail.subCount"
      :shareCount="audioDetail.shareCount"
      :category="audioDetail.category"
      :desc="audioDetail.desc"
    ></detailPanel>
    <detailNav style="margin-bottom: 20px" :routerKey="'kIndex'" :list="navList"></detailNav>
    <div class="routerView">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { getAudioDetail } from "@/network/Audio/audioDetail";
import { useRouter } from "vue-router";
import detailPanel from "@/components/common/detailPanel.vue";
import { InitData } from "@/types/Audio/AudioDetail";
import detailNav from "@/components/common/detailNav.vue"
import loading from "@/components/common/loading.vue";

export default defineComponent({
  name: 'AudioDetail',
  components: {
    detailPanel,
    detailNav,
    loading
  },
  setup() {
    const data = reactive(new InitData())
    const router = useRouter()

    onMounted(() => {
      let t = router.currentRoute.value.query
      getAudioDetail({
        rid: t.audioId as string
      }).then((res: any) => {
        data.audioDetail = res.data.data
        data.navList[0] = {
          name: `声音<span style='color: #949494; font-size: 12px'>(${data.audioDetail.programCount})</span>`,
          path: '/AudioSongs?audioId='+t.audioId
        }
        data.navList[1] = {
          name: `收藏者<span style='color: #949494; font-size: 12px'>(${data.audioDetail.subCount})</span>`,
          path: '/AudioCollect?audioId='+t.audioId
        }
      })
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#AudioDetail {
  padding: 40px;
}
</style>