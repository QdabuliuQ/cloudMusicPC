<template>
  <div id="RecentSongs">
    <loading v-if="songList.length == 0 && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <musicList v-else :data="songList" :columns="columns">
      <template v-slot:name="{ content }">
        <div class="songName" style="display: flex; align-items: center">
          {{ content.name }}
          <targetList
            :mv="content.mv"
            :sq="content.sq"
            :vip="content.fee == 1"
          ></targetList>
        </div>
      </template>
      <template v-slot:ar="{ content }">
        <div class="singerName">
          <span @click="router.push('/SingerDetail?id='+item.id)" v-for="item in content.ar" :key="item.id">
            {{ item.name }}&nbsp;&nbsp;
          </span>
        </div>
      </template>
      <template v-slot:playTime="{ content }">
        <div class="tItem">
          {{ $getTime(content.playTime) }}
        </div>
      </template>
    </musicList>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import musicList from "@/components/common/musicList.vue";
import { InitData } from "@/types/Recent/RecentSongs";
import { getRecentSongs } from "@/network/Recent/recent";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import targetList from "@/components/common/targetList.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "RecentSongs",
  components: {
    musicList,
    loading,
    emptyContent,
    targetList,
  },
  setup() {
    const router = useRouter()
    const data = reactive(new InitData());
    onMounted(() => {
      getRecentSongs().then((res: any) => {
        data.total = res.data.data.total;
        let newarr: any = [];
        res.data.data.list.map((item: any, index: number) => {
          newarr.push(Object.assign(item, { ...item.data }));
          delete item.data;
        });
        data.songList = newarr;
      });
    });
    return {
      router,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#RecentSongs {
  .tItem {
    color: @fontColor;
  }
  .songName {
    color: var(--textColor);
  }
  .singerName {
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span {
      color: @fontColor;
      &:hover {
        color: var(--textColor);
      }
    }
  }
}
</style>