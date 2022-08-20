<template>
  <div id="AiteMessage">
    <loading v-if="!dataList.length && more == null" />
    <emptyContent v-if="dataList.length == 0 && !more" />
    <div
      v-else
      v-masonry
      transiton-duration="0.3s"
      item-selector=".followItem"
      column-width=".followItem"
      :gutter="12"
      class="dataContainer"
      v-infinite-scroll="loadData"
      :infinite-scroll-disabled="disableScroll"
      :infinite-scroll-delay="700"
      :infinite-scroll-immediate="false"
    >
      <div
        v-for="item in dataList"
        v-masonry-tile
        :key="item.id"
        class="followItem"
      >
        <div class="item">
          <songEItem
            class="eventItem"
            v-if="item.json.type == 18"
            :avatarUrl="item.json.user.avatarUrl"
            :nickname="item.json.user.nickname"
            :uid="item.json.user.userId"
            :time="item.json.showTime"
            :infoJson="item.json.json"
            :target="item.json.bottomActivityInfos"
            :liked="item.json.info.liked"
            :threadId="item.json.info.threadId"
            :likedCount="item.json.info.likedCount"
            :commentCount="item.json.info.commentCount"
            :shareCount="item.json.info.shareCount"
            :pics="item.json.pics"
            :disableOpe="true"
          ></songEItem>
          <albumEItem
            class="eventItem"
            v-else-if="item.json.type == 19"
            :avatarUrl="item.json.user.avatarUrl"
            :nickname="item.json.user.nickname"
            :uid="item.json.user.userId"
            :time="item.json.showTime"
            :infoJson="item.json.json"
            :target="item.json.bottomActivityInfos"
            :liked="item.json.info.liked"
            :threadId="item.json.info.threadId"
            :likedCount="item.json.info.likedCount"
            :commentCount="item.json.info.commentCount"
            :shareCount="item.json.info.shareCount"
            :pics="item.json.pics"
            :disableOpe="true"
          ></albumEItem>
          <audioEItem
            class="eventItem"
            v-else-if="item.json.type == 28"
            :avatarUrl="item.json.user.avatarUrl"
            :nickname="item.json.user.nickname"
            :uid="item.json.user.userId"
            :time="item.json.showTime"
            :infoJson="item.json.json"
            :target="item.json.bottomActivityInfos"
            :liked="item.json.info.liked"
            :threadId="item.json.info.threadId"
            :likedCount="item.json.info.likedCount"
            :commentCount="item.json.info.commentCount"
            :shareCount="item.json.info.shareCount"
            :pics="item.json.pics"
            :disableOpe="true"
          ></audioEItem>
          <programEItem
            class="eventItem"
            v-else-if="item.json.type == 17"
            :avatarUrl="item.json.user.avatarUrl"
            :nickname="item.json.user.nickname"
            :uid="item.json.user.userId"
            :time="item.json.showTime"
            :infoJson="item.json.json"
            :target="item.json.bottomActivityInfos"
            :liked="item.json.info.liked"
            :threadId="item.json.info.threadId"
            :likedCount="item.json.info.likedCount"
            :commentCount="item.json.info.commentCount"
            :shareCount="item.json.info.shareCount"
            :pics="item.json.pics"
            :disableOpe="true"
          ></programEItem>
          <replyEItem
            class="eventItem"
            v-else-if="item.json.type == 22"
            :avatarUrl="item.json.user.avatarUrl"
            :nickname="item.json.user.nickname"
            :uid="item.json.user.userId"
            :time="item.json.showTime"
            :infoJson="item.json.json"
            :liked="item.json.info.liked"
            :threadId="item.json.info.threadId"
            :likedCount="item.json.info.likedCount"
            :commentCount="item.json.info.commentCount"
            :shareCount="item.json.info.shareCount"
            :pics="item.json.pics"
            :disableOpe="true"
          ></replyEItem>
          <sheetEItem
            class="eventItem"
            v-else-if="item.json.type == 13"
            :avatarUrl="item.json.user.avatarUrl"
            :nickname="item.json.user.nickname"
            :uid="item.json.user.userId"
            :time="item.json.showTime"
            :infoJson="item.json.json"
            :liked="item.json.info.liked"
            :threadId="item.json.info.threadId"
            :likedCount="item.json.info.likedCount"
            :commentCount="item.json.info.commentCount"
            :shareCount="item.json.info.shareCount"
            :pics="item.json.pics"
            :disableOpe="true"
          ></sheetEItem>
          <videoEItem
            class="eventItem"
            v-else-if="item.json.type == 41"
            :avatarUrl="item.json.user.avatarUrl"
            :nickname="item.json.user.nickname"
            :uid="item.json.user.userId"
            :time="item.json.showTime"
            :infoJson="item.json.json"
            :liked="item.json.info.liked"
            :threadId="item.json.info.threadId"
            :likedCount="item.json.info.likedCount"
            :commentCount="item.json.info.commentCount"
            :shareCount="item.json.info.shareCount"
            :pics="item.json.pics"
            :disableOpe="true"
          ></videoEItem>
          <mvEItem
            class="eventItem"
            v-else-if="item.json.type == 21"
            :avatarUrl="item.json.user.avatarUrl"
            :nickname="item.json.user.nickname"
            :uid="item.json.user.userId"
            :time="item.json.showTime"
            :infoJson="item.json.json"
            :liked="item.json.info.liked"
            :threadId="item.json.info.threadId"
            :likedCount="item.json.info.likedCount"
            :commentCount="item.json.info.commentCount"
            :shareCount="item.json.info.shareCount"
            :pics="item.json.pics"
            :disableOpe="true"
          ></mvEItem>
          <commentEItem
            class="eventItem"
            v-else-if="item.json.type == 31"
            :avatarUrl="item.json.user.avatarUrl"
            :nickname="item.json.user.nickname"
            :uid="item.json.user.userId"
            :time="item.json.showTime"
            :infoJson="item.json.json"
            :liked="item.json.info.liked"
            :threadId="item.json.info.threadId"
            :likedCount="item.json.info.likedCount"
            :commentCount="item.json.info.commentCount"
            :shareCount="item.json.info.shareCount"
            :pics="item.json.pics"
            :disableOpe="true"
          ></commentEItem>
          <textEItem
            class="eventItem"
            v-else-if="item.json.type == 35"
            :avatarUrl="item.json.user.avatarUrl"
            :nickname="item.json.user.nickname"
            :uid="item.json.user.userId"
            :time="item.json.showTime"
            :infoJson="item.json.json"
            :target="item.json.bottomActivityInfos"
            :liked="item.json.info.liked"
            :threadId="item.json.info.threadId"
            :likedCount="item.json.info.likedCount"
            :commentCount="item.json.info.commentCount"
            :shareCount="item.json.info.shareCount"
            :pics="item.json.pics"
            :disableOpe="true"
          ></textEItem>
          <unsupportEItem
            class="eventItem"
            v-else
            :avatarUrl="item.json.user.avatarUrl"
            :nickname="item.json.user.nickname"
            :uid="item.json.user.userId"
            :time="item.json.showTime"
            :infoJson="item.json.json"
            :target="item.json.bottomActivityInfos"
            :liked="item.json.info.liked"
            :threadId="item.json.info.threadId"
            :likedCount="item.json.info.likedCount"
            :commentCount="item.json.info.commentCount"
            :shareCount="item.json.info.shareCount"
            :pics="item.json.pics"
            :disableOpe="true"
          ></unsupportEItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  defineAsyncComponent,
  getCurrentInstance,
} from "vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { getAiteList } from "@/network/Message/aiteMessage";
import { InitData } from "@/types/Message/AiteMessage";
const songEItem = defineAsyncComponent(
  () => import("@/views/UserInfo/songEItem.vue")
);
const albumEItem = defineAsyncComponent(
  () => import("@/views/UserInfo/albumEItem.vue")
);
const audioEItem = defineAsyncComponent(
  () => import("@/views/UserInfo/audioEItem.vue")
);
const programEItem = defineAsyncComponent(
  () => import("@/views/UserInfo/programEItem.vue")
);
const sheetEItem = defineAsyncComponent(
  () => import("@/views/UserInfo/sheetEItem.vue")
);
const videoEItem = defineAsyncComponent(
  () => import("@/views/UserInfo/videoEItem.vue")
);
const mvEItem = defineAsyncComponent(
  () => import("@/views/UserInfo/mvEItem.vue")
);
const replyEItem = defineAsyncComponent(
  () => import("@/views/UserInfo/replyEItem.vue")
);
const commentEItem = defineAsyncComponent(
  () => import("@/views/UserInfo/commentEItem.vue")
);
const textEItem = defineAsyncComponent(
  () => import("@/views/UserInfo/textEItem.vue")
);
const unsupportEItem = defineAsyncComponent(
  () => import("@/views/UserInfo/unsupportEItem.vue")
);

export default defineComponent({
  name: "AiteMessage",
  components: {
    songEItem,
    albumEItem,
    audioEItem,
    programEItem,
    replyEItem,
    sheetEItem,
    videoEItem,
    mvEItem,
    commentEItem,
    textEItem,
    unsupportEItem,
    loading,
    emptyContent,
  },
  setup() {
    const _this: any = getCurrentInstance();
    const data = reactive(new InitData());

    const loadData = () => {
      getData();
    };
    // 获取数据
    const getData = () => {
      getAiteList({
        limit: 30,
        offset: data.offset++,
      }).then((res: any) => {
        data.disableScroll = !res.data.more;
        data.more = res.data.more;
        for (const item of res.data.forwards) {
          item.json = JSON.parse(item.json);
        }

        data.dataList = [...data.dataList, ...res.data.forwards];
        setTimeout(() => {
          _this.appContext.config.globalProperties.$redrawVueMasonry();
        }, 100);
      });
    };
    getData();

    return {
      loadData,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#AiteMessage {
  .dataContainer {
    width: 100%;
    height: auto;
    .followItem {
      width: 32.2%;
      margin-bottom: 12px;
      box-sizing: border-box;
      .eventContent {
        margin-left: 50px;
        padding: 8px 12px;
        background: var(--messageColor);
        border-radius: 8px;
        font-size: 13px;
        cursor: pointer;
      }
      .replyEventContent {
        background: var(--messageColor);
      }
      .item {
        border-radius: 10px;
        padding: 10px;
        background-color: var(--hoverColor);
        .eventItem {
          .eventPics {
            zoom: 0.72;
          }
        }
      }
    }
  }
}
</style>