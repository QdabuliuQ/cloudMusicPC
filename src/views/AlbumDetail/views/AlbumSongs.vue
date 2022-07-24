<template>
  <div id="AlbumSongs">
    <loading v-if="!songList.length && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <musicList
      v-else
      :columns="columns"
      :data="songList"
    >
      <template v-slot:name="{ content }">
        <div class="songName">
          {{ content.name }}
          <span v-for="(item, index) in content.alia" :key="index">
            ({{ item }})&nbsp;&nbsp;
          </span>
          <targetList
            :mv="content.mv"
            :sq="content.sq"
            :vip="content.fee == 1"
          ></targetList>
        </div>
      </template>
      <template v-slot:ar="{ content }">
        <span
          @click="router.push('/SingerDetail?id='+item.id)"
          class="infoItem singerItem"
          v-for="item in content.ar"
          :key="item.id"
          >{{ item.name }}&nbsp;&nbsp;</span
        >
      </template>
      <template v-slot:al="{ content }">
        <div class="infoItem clickItem">
          {{ content.al.name }}
        </div>
      </template>
      <template v-slot:dt="{ content }">
        <span class="infoItem">{{ $formatTime(content.dt) }}</span>
      </template>
    </musicList>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import musicList from "@/components/common/musicList.vue";
import targetList from "@/components/common/targetList.vue";
import { InitData } from "@/types/AlbumDetail/AlbumSongs";
import { getAlbumDetail } from "@/network/AlbumDetail/albumDetail";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'AlbumSongs',
  components: {
    loading,
    emptyContent,
    musicList,
    targetList
  },
  setup() {
    const router = useRouter()
    const data = reactive(new InitData())
    data.id = router.currentRoute.value.query.id as string

    const getData = () => {
      getAlbumDetail({
        id: data.id
      }).then((res: any) => {
        data.total = res.data.album.size
        data.songList = res.data.songs
      })
    }
    getData()

    return {
      router,
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#AlbumSongs {
  .songName {
    display: flex;
    align-items: center;
  }
  .infoItem {
    color: @fontColor;
  }
  .singerItem {
    &:hover {
      color: #fff;
    }
  }
}
</style>