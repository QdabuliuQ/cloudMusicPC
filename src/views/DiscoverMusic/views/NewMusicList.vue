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
    <table v-else class="listTable">
      <tbody>
        <tr v-for="(item, index) in newSongList" :key="item.id">
          <td class="musicIndex" style="width: 3%">{{ index+1<10?'0'+(index+1):index+1 }}</td>
          <td style="width: 50%" class="musicInfo">
            <div class="image">
              <img :src="item.album.blurPicUrl" alt="" />
            </div>
            <div class="name">
              {{ item.name }}
            </div>
          </td>
          <td style="width: 20%; margin-right: 8px" class="musicArtist">
            <span class="textFlow" v-for="art,i in item.artists" :key="art.name">
              <label v-if="i != item.length && i != 0">&nbsp;/&nbsp;</label>
              {{ art.name }}
            </span>
          </td>
          <td class="textFlow musicAlbum" style="width: 20%">
            {{item.album.name}}
          </td>
          <td style="text-align: right; width: 7%">
            {{$formatTime(item.duration)}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/DiscoverMusic/NewMusicList";
import { getNewSongs } from "@/network/DiscoverMusic/newMusicList";
import loading from "@/components/common/loading.vue"

export default defineComponent({
  name: "NewMusicList",
  components: {
    loading
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
  .listTable {
    width: 100%;
    .textFlow {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    tr {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      cursor: pointer;
      padding: 0 15px;
      color: @fontColor;
      font-size: 13px;
      border-radius: 8px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.068);
      }
    }
    .musicIndex {
      color: @fontColor;
      font-size: 13px;
    }
    .musicInfo {
      display: flex;
      align-items: center;
      .image {
        width: 4vw;
        min-height: 4vw;
        background: @loadColor;
        margin-right: 10px;
        display: flex;
        align-items: center;
        border-radius: 8px;
        img {
          width: 100%;
          border-radius: 8px;
        }
      }
      .name {
        font-size: 13px;
        color: #fff;
      }
    }

    .musicArtist {
      display: flex;
      align-items: center;
      
      .image {
        width: 1vw;
        border-radius: 50%;
      }
    }
    .musicAlbum {
      color: @fontColor;
      font-size: 13px;
    }
  }
}
</style>