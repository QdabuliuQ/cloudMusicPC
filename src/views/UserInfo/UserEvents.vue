<template>
  <div id="UserEvents">
    <div v-if="userInfo" class="title">{{ userInfo.nickname }}的动态</div>
    <div class="eventContainer">
      <loading v-if="!eventList.length && size != 0"></loading>
      <div v-for="item in eventList" :key="item.id" class="eventItem">
        <songEItem
          class="eventItem"
          v-if="item.type == 18"
          :avatarUrl="item.user.avatarUrl"
          :nickname="item.user.nickname"
          :time="item.showTime"
          :infoJson="item.json"
          :target="item.bottomActivityInfos"
          :liked="item.info.liked"
          :threadId="item.info.threadId"
          :likedCount="item.info.likedCount"
          :commentCount="item.info.commentCount"
          :shareCount="item.info.shareCount"
          :pics="item.pics"
        ></songEItem>
        <albumEItem
          class="eventItem"
          v-else-if="item.type == 19"
          :avatarUrl="item.user.avatarUrl"
          :nickname="item.user.nickname"
          :time="item.showTime"
          :infoJson="item.json"
          :target="item.bottomActivityInfos"
          :liked="item.info.liked"
          :threadId="item.info.threadId"
          :likedCount="item.info.likedCount"
          :commentCount="item.info.commentCount"
          :shareCount="item.info.shareCount"
          :pics="item.pics"
        ></albumEItem>
        <audioEItem
          class="eventItem"
          v-else-if="item.type == 28"
          :avatarUrl="item.user.avatarUrl"
          :nickname="item.user.nickname"
          :time="item.showTime"
          :infoJson="item.json"
          :target="item.bottomActivityInfos"
          :liked="item.info.liked"
          :threadId="item.info.threadId"
          :likedCount="item.info.likedCount"
          :commentCount="item.info.commentCount"
          :shareCount="item.info.shareCount"
          :pics="item.pics"
        ></audioEItem>
        <programEItem
          class="eventItem"
          v-else-if="item.type == 17"
          :avatarUrl="item.user.avatarUrl"
          :nickname="item.user.nickname"
          :time="item.showTime"
          :infoJson="item.json"
          :target="item.bottomActivityInfos"
          :liked="item.info.liked"
          :threadId="item.info.threadId"
          :likedCount="item.info.likedCount"
          :commentCount="item.info.commentCount"
          :shareCount="item.info.shareCount"
          :pics="item.pics"
        ></programEItem>
        <replyEItem
          class="eventItem"
          v-else-if="item.type == 22"
          :avatarUrl="item.user.avatarUrl"
          :nickname="item.user.nickname"
          :time="item.showTime"
          :infoJson="item.json"
          :liked="item.info.liked"
          :threadId="item.info.threadId"
          :likedCount="item.info.likedCount"
          :commentCount="item.info.commentCount"
          :shareCount="item.info.shareCount"
          :pics="item.pics"
        ></replyEItem>
        <sheetEItem
          class="eventItem"
          v-else-if="item.type == 13"
          :avatarUrl="item.user.avatarUrl"
          :nickname="item.user.nickname"
          :time="item.showTime"
          :infoJson="item.json"
          :liked="item.info.liked"
          :threadId="item.info.threadId"
          :likedCount="item.info.likedCount"
          :commentCount="item.info.commentCount"
          :shareCount="item.info.shareCount"
          :pics="item.pics"
        ></sheetEItem>
        <videoEItem
          class="eventItem"
          v-else-if="item.type == 41"
          :avatarUrl="item.user.avatarUrl"
          :nickname="item.user.nickname"
          :time="item.showTime"
          :infoJson="item.json"
          :liked="item.info.liked"
          :threadId="item.info.threadId"
          :likedCount="item.info.likedCount"
          :commentCount="item.info.commentCount"
          :shareCount="item.info.shareCount"
          :pics="item.pics"
        ></videoEItem>
        <mvEItem
          class="eventItem"
          v-else-if="item.type == 21"
          :avatarUrl="item.user.avatarUrl"
          :nickname="item.user.nickname"
          :time="item.showTime"
          :infoJson="item.json"
          :liked="item.info.liked"
          :threadId="item.info.threadId"
          :likedCount="item.info.likedCount"
          :commentCount="item.info.commentCount"
          :shareCount="item.info.shareCount"
          :pics="item.pics"
        ></mvEItem>
        <commentEItem
          class="eventItem"
          v-else-if="item.type == 31"
          :avatarUrl="item.user.avatarUrl"
          :nickname="item.user.nickname"
          :time="item.showTime"
          :infoJson="item.json"
          :liked="item.info.liked"
          :threadId="item.info.threadId"
          :likedCount="item.info.likedCount"
          :commentCount="item.info.commentCount"
          :shareCount="item.info.shareCount"
          :pics="item.pics"
        ></commentEItem>
      </div>
      <emptyContent v-if="size == 0"></emptyContent>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  defineAsyncComponent,
} from "vue";
import { InitData } from "@/types/UserInfo/UserEvents";
import { getUserEvents } from "@/network/UserInfo/UserEvents";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
const songEItem = defineAsyncComponent(() => import("./songEItem.vue"));
const albumEItem = defineAsyncComponent(() => import("./albumEItem.vue"));
const audioEItem = defineAsyncComponent(() => import("./audioEItem.vue"));
const programEItem = defineAsyncComponent(() => import("./programEItem.vue"));
const sheetEItem = defineAsyncComponent(() => import("./sheetEItem.vue"));
const videoEItem = defineAsyncComponent(() => import("./videoEItem.vue"));
const mvEItem = defineAsyncComponent(() => import("./mvEItem.vue"));
const replyEItem = defineAsyncComponent(() => import("./replyEItem.vue"));
const commentEItem = defineAsyncComponent(() => import("./commentEItem.vue"));

export default defineComponent({
  name: "UserEvents",
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
    loading,
    emptyContent,
  },
  setup() {
    const data = reactive(new InitData());

    const getData = () => {
      getUserEvents({
        uid: data.userInfo.userId,
        limit: 30,
        lasttime: data.lasttime,
      }).then((res: any) => {
        data.size = res.data.size;
        data.eventList = [...data.eventList, ...res.data.events];
        data.lasttime = res.data.lasttime;
      });
    };

    onMounted(() => {
      data.userInfo = JSON.parse(localStorage.getItem("data") as string);

      getData();
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#UserEvents {
  padding: 40px;
  .title {
    font-size: 19px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .eventItem {
    margin-bottom: 18px;
    .eventContent {
      margin-left: 60px;
      padding: 8px 12px;
      background: @eventBgc;
      border-radius: 8px;
      font-size: 13px;
      cursor: pointer;
    }
    .eventPics {
      margin-left: 60px;
      margin-top: 15px;
    }
  }
}
</style>