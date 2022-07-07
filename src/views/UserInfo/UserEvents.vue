<template>
  <div id="UserEvents">
    <div v-if="userInfo" class="title">{{ userInfo.nickname }}的动态</div>
    <div class="eventContainer">
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
          :pics='item.pics'
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
          :pics='item.pics'
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
          :pics='item.pics'
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
          :pics='item.pics'
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
          :pics='item.pics'
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
          :pics='item.pics'
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
          :pics='item.pics'
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
          :pics='item.pics'
        ></mvEItem>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/UserInfo/UserEvents";
import { getUserEvents } from "@/network/UserInfo/UserEvents";
import songEItem from "./songEItem.vue";
import albumEItem from "./albumEItem.vue";
import audioEItem from "./audioEItem.vue";
import programEItem from "./programEItem.vue";
import replyEItem from "./replyEItem.vue";
import sheetEItem from "./sheetEItem.vue";
import videoEItem from "./videoEItem.vue";
import mvEItem from "./mvEItem.vue";

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
    mvEItem
  },
  setup() {
    const data = reactive(new InitData());

    const getData = () => {
      getUserEvents({
        uid: data.userInfo.userId,
        limit: 30,
        lasttime: data.lasttime,
      }).then((res: any) => {
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
      margin-top: 7px;
    }
  }
}
</style>