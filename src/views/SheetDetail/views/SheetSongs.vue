<template>
  <loading v-if="!songList.length && total != 0"></loading>
  <emptyContent v-else-if="total == 0"></emptyContent>
  <div
    v-else
    :infinite-scroll-disabled="disableScroll"
    :infinite-scroll-immediate="false"
    :infinite-scroll-delay="700"
    v-infinite-scroll="loadData"
    id="SheetSongs"
  >
    <musicList
      :isMe="isMe"
      :download="true"
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
          class="infoItem clickItem"
          v-for="item in content.ar"
          :key="item.id"
          @click="router.push('/SingerDetail?id='+item.id)"
          >{{ item.name }}&nbsp;&nbsp;</span
        >
      </template>
      <template v-slot:al="{ content }">
        <div @click="router.push('/AlbumDetail?id='+content.al.id)" class="infoItem clickItem">
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
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import {
  getSheetSongs,
  getSheetDetail,
} from "@/network/SheetDetail/sheetDetail";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SheetDetail/SheetSongs";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import musicList from "@/components/common/musicList.vue";
import targetList from "@/components/common/targetList.vue";

export default defineComponent({
  name: "SheetSongs",
  components: {
    loading,
    emptyContent,
    musicList,
    targetList,
  },
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();

    const loadData = () => {
      getData();
    };
    const getData = () => {
      getSheetSongs({
        id: router.currentRoute.value.query.id as string,
        offset: data.offset * 20,
        limit: 20,
      }).then((res: any) => {
        if (data.total == 999) {
          data.total = res.data.songs.length;
        }
        if (res.data.songs.length) {
          data.offset++;
          data.songList = [...data.songList, ...res.data.songs];
        } else {
          data.disableScroll = true;
        }
      });
    };

    onMounted(() => {
      getData();

      getSheetDetail({
        id: router.currentRoute.value.query.id as string,
      }).then((res: any) => {
        if (localStorage.getItem("id")) {
          data.isMe =
            decodeURIComponent(
              window.atob(localStorage.getItem("id") as string)
            ) == res.data.playlist.userId;
        }
      });
    });
    return {
      router,
      ...toRefs(data),
      loadData,
    };
  },
});
</script>

<style lang='less'>
#SheetSongs {
  width: 100%;
  .songName {
    display: flex;
    align-items: center;
    width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span {
      color: @fontColor;
    }
  }
  .infoItem {
    width: 200px;
    color: @fontColor;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .clickItem {
    &:hover {
      color: #fff;
    }
  }
}
</style>