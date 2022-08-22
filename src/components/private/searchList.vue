<template>
  <div id="searchList">
    <el-scrollbar height="500px">
      <div class="searchInfoContainer">
        <div v-show="!searchRecommentList.length" class="hotListContainer">
          <div class="title">热搜榜</div>
          <div
            @click="clickSearch(item.searchWord)"
            v-for="(item, index) in searchList"
            :key="item.score"
            class="searchItem"
          >
            <div
              :style="{ color: index < 3 ? '#ec4141' : '' }"
              class="itemIndex"
            >
              {{ index + 1 }}
            </div>
            <div class="itemInfo">
              <div>
                <div class="itemName">
                  {{ item.searchWord }}
                  <span
                    ><img src="~images/mvList/fire.png" alt="" />{{
                      item.score
                    }}</span
                  >
                  <img
                    :style="{
                      width: item.iconType == 5 ? '12px' : '30px',
                    }"
                    v-if="item.iconUrl"
                    :src="item.iconUrl"
                    alt=""
                  />
                </div>
                <div v-if="item.content" class="itemContent">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="searchRecommentList.length" class="recommentListContainer">
          <div class="title">猜你喜欢</div>
          <div
            v-for="(item, index) in searchRecommentList"
            :key="index"
            class="recommendItem"
          >
            <div class="itemTitle">
              <img
                style="width: 22px; left: 3px"
                v-if="item.type == 'songs'"
                src="~images/musicNavBar/song.png"
                alt=""
              />
              <img
                v-else-if="item.type == 'artists'"
                src="~images/musicNavBar/singer.png"
                alt=""
              />
              <img
                v-else-if="item.type == 'albums'"
                src="~images/musicNavBar/album.png"
                alt=""
              />
              <img
                v-else-if="item.type == 'playlists'"
                src="~images/musicNavBar/sheet.png"
                alt=""
              />
              {{ recommendType(item.type) }}
            </div>
            <div
              @click="toDetail(i.id, item.type, i.name)"
              v-for="i in item.children"
              :key="i.id"
              class="item"
            >
              {{ i.name }}
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "searchList",
  emits: ['searchEvent'],
  props: ["searchRecommentList", "searchList"],
  setup(p, ctx) {
    const router = useRouter();
    const recommendType = (e: string) => {
      switch (e) {
        case "songs":
          return "歌曲";
        case "artists":
          return "歌手";
        case "albums":
          return "专辑";
        case "playlists":
          return "歌单";
      }
    };

    const toDetail = (e: any, t: string, name: string) => {
      switch (t) {
        case "artists":
          router.push("/SingerDetail?id=" + e);
          break;
        case "playlists":
          router.push("/SheetDetail?id=" + e);
          break;
        default:
          router.push("/SearchResult?key=" + name);
      }
      ctx.emit('searchEvent', name)
    };
    const clickSearch = (key: string) => {
      router.push("/SearchResult?key=" + key);
      ctx.emit('searchEvent', key)
    };

    return {
      clickSearch,
      toDetail,
      recommendType,
    };
  },
});
</script>

<style lang='less'>
#searchList {
  .searchInfoContainer {
    .title {
      font-weight: bold;
      color: var(--textColor);
      margin-bottom: 10px;
    }
    .hotListContainer {
      .searchItem {
        padding: 10px 0;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          background: var(--hoverColor);
        }
        .itemIndex {
          width: 30px;
          min-width: 30px;
          font-weight: bold;
        }
        .itemInfo {
          display: flex;
          align-items: center;
          min-height: 40px;
          color: var(--textColor);
          font-size: 13px;
          font-weight: bold;
          .itemName {
            width: 350px;
            display: flex;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            span {
              font-size: 12px;
              color: @fontColor;
              margin-left: 5px;
              display: flex;
              align-items: center;
              img {
                width: 15px;
                opacity: 0.7;
                margin-right: 4px;
              }
            }
          }
          img {
            width: 30px;
            margin-left: 10px;
          }
        }
        .itemContent {
          width: 350px;
          font-size: 12px;
          color: @fontColor;
          margin-top: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .recommentListContainer {
      .recommendItem {
        font-size: 13px;
        .itemTitle {
          padding: 8px 30px;
          display: flex;
          align-items: center;
          position: relative;
          font-weight: bold;
          font-size: 14px;
          img {
            width: 20px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 5px;
          }
        }
        .item {
          padding: 8px 30px;
          color: var(--textColor);
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:hover {
            background-color: var(--hoverColor);
          }
        }
      }
    }
  }
}
</style>