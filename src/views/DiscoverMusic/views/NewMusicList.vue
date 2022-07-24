<template>
  <div id="NewMusicList">
    <div class="langListContainer">
      <span
        @click="itemToggle(index)"
        :class="[langIndex == index ? 'langActiveItem' : '', 'langItem']"
        v-for="(item, index) in languageList"
        :key="item.id"
        >{{ item.name }}</span
      >
    </div>
    <loading v-if="!newSongList.length"></loading>
    <tableList :columns="columns" :data="newSongList">
      <template v-slot:index="{ index }">
        <span style="font-weight:bold;">{{index}}</span>
      </template>
      <template v-slot:blurPicUrl="{ content }">
        <div class="songImage">
          <el-avatar shape="square" :size="60" :fit="'contain'" :src="content.album.blurPicUrl" />
        </div>
      </template>
      <template v-slot:name="{ content }">
        <div class="songName">
          {{ content.name }}
          <targetList
            :mv="content.mv"
            :sq="content.sq"
            :vip="content.fee == 1"
          ></targetList>
        </div>
      </template>
      <template v-slot:artists="{ content }">
        <span
          class="infoItem clickItem"
          v-for="item in content.artists"
          :key="item.name"
          >{{ item.name }}&nbsp;&nbsp;</span
        >
      </template>
      <template v-slot:album="{ content }">
        <div class="infoItem clickItem">
          {{ content.album.name }}
        </div>
      </template>
      <template v-slot:duration="{ content }">
        <span style="text-align:right" class="infoItem">{{ $formatTime(content.duration) }}</span>
      </template>
    </tableList>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/DiscoverMusic/NewMusicList";
import { getNewSongs } from "@/network/DiscoverMusic/newMusicList";
import loading from "@/components/common/loading.vue"
import tableList from "@/components/common/tableList.vue";
import targetList from "@/components/common/targetList.vue";

export default defineComponent({
  name: "NewMusicList",
  components: {
    loading,
    tableList,
    targetList
  },
  setup() {
    const data = reactive(new InitData());
    // 切换数据
    const itemToggle = (e: number) => {
      data.langIndex = e;
      data.newSongList = []
      newSongsData(data.languageList[data.langIndex].id)
    };
    // 获取数据
    const newSongsData = (type: string | number) => {
      getNewSongs({
        type,
      }).then((res: any) => {
        data.newSongList = res.data.data;
      });
    };
    onMounted(() => {
      newSongsData(data.languageList[data.langIndex].id);
    });
    return {
      ...toRefs(data),
      itemToggle,
    };
  },
});
</script>

<style lang='less'>
#NewMusicList {
  .langListContainer {
    margin: 25px 0 15px;
    display: flex;
    align-items: center;
    color: @fontColor;
    font-size: 14px;
    .langItem {
      margin-right: 30px;
      cursor: pointer;
    }
    .langActiveItem {
      color: @themeColor !important;
      font-weight: bold;
    }
  }
  .songName {
    display: flex;
    align-items: center;
  }
  .songImage {
    display: flex;
    align-items: center;
  }
  .infoItem {
    color: @fontColor;
  }
}
</style>