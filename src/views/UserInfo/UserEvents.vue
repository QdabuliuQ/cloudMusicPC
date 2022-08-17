<template>
  <div id="UserEvents">
    <div v-if="userInfo" class="title">{{ userInfo.nickname }}的动态</div>
    <loading v-if="!eventList.length && size != 0"></loading>
    <emptyContent v-else-if="eventList.length == 0 && size == 0"></emptyContent>
    <div
      v-if="showContainer"
      :infinite-scroll-delay="700"
      :infinite-scroll-disabled="disableScroll"
      :infinite-scroll-immediate="false"
      v-infinite-scroll="loadData"
      class="eventContainer"
    >
      <div v-for="item in eventList" :key="item.id" class="eventItem">
        <songEItem
          class="eventItem"
          v-if="item.type == 18"
          :avatarUrl="item.user.avatarUrl"
          :nickname="item.user.nickname"
          :uid="item.user.userId"
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
          :uid="item.user.userId"
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
          :uid="item.user.userId"
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
          :uid="item.user.userId"
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
          :uid="item.user.userId"
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
          :uid="item.user.userId"
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
          :uid="item.user.userId"
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
          :uid="item.user.userId"
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
          :uid="item.user.userId"
          :time="item.showTime"
          :infoJson="item.json"
          :liked="item.info.liked"
          :threadId="item.info.threadId"
          :likedCount="item.info.likedCount"
          :commentCount="item.info.commentCount"
          :shareCount="item.info.shareCount"
          :pics="item.pics"
        ></commentEItem>
        <textEItem
          class="eventItem"
          v-else-if="item.type == 35"
          :avatarUrl="item.user.avatarUrl"
          :nickname="item.user.nickname"
          :uid="item.user.userId"
          :time="item.showTime"
          :infoJson="item.json"
          :target="item.bottomActivityInfos"
          :liked="item.info.liked"
          :threadId="item.info.threadId"
          :likedCount="item.info.likedCount"
          :commentCount="item.info.commentCount"
          :shareCount="item.info.shareCount"
          :pics="item.pics"
        ></textEItem>
        <unsupportEItem
          class="eventItem"
          v-else
          :avatarUrl="item.user.avatarUrl"
          :nickname="item.user.nickname"
          :uid="item.user.userId"
          :time="item.showTime"
          :infoJson="item.json"
          :target="item.bottomActivityInfos"
          :liked="item.info.liked"
          :threadId="item.info.threadId"
          :likedCount="item.info.likedCount"
          :commentCount="item.info.commentCount"
          :shareCount="item.info.shareCount"
          :pics="item.pics"
        ></unsupportEItem>
      </div>
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
  nextTick,
  getCurrentInstance,
} from "vue";
import { ElNotification } from "element-plus";
import { InitData } from "@/types/UserInfo/UserEvents";
import {
  getUserEvents,
  deleteEvent,
  getFollowEvent,
} from "@/network/UserInfo/userEvents";
import { getUserDetail } from "@/network/LoginDialog/loginDialog";
import { getTopicEvent } from "@/network/Topic/topic";
import bus from "vue3-eventbus";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { useRouter } from "vue-router";
const songEItem = defineAsyncComponent(() => import("./songEItem.vue"));
const albumEItem = defineAsyncComponent(() => import("./albumEItem.vue"));
const audioEItem = defineAsyncComponent(() => import("./audioEItem.vue"));
const programEItem = defineAsyncComponent(() => import("./programEItem.vue"));
const sheetEItem = defineAsyncComponent(() => import("./sheetEItem.vue"));
const videoEItem = defineAsyncComponent(() => import("./videoEItem.vue"));
const mvEItem = defineAsyncComponent(() => import("./mvEItem.vue"));
const replyEItem = defineAsyncComponent(() => import("./replyEItem.vue"));
const commentEItem = defineAsyncComponent(() => import("./commentEItem.vue"));
const textEItem = defineAsyncComponent(() => import("./textEItem.vue"));
const unsupportEItem = defineAsyncComponent(
  () => import("./unsupportEItem.vue")
);

export default defineComponent({
  name: "UserEvents",
  props: ["actid"],
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
    textEItem,
    unsupportEItem,
  },
  setup(props) {
    const data = reactive(new InitData());
    const _this: any = getCurrentInstance();
    const router = useRouter();

    // 加载数据
    const loadData = () => {
      if (!props.actid) {
        getData();
      }
    };

    // 获取数据
    const getData = () => {
      let p = router.currentRoute.value.fullPath;
      if (p != "/FollowUserEvents" && !props.actid) {
        getUserEvents({
          uid: data.userInfo.userId,
          limit: 15,
          lasttime: data.lasttime,
        }).then((res: any) => {
          if (data.lasttime == -1) {
            nextTick(() => {
              data.showContainer = true;
            });
          }
          data.size = res.data.size;
          if (res.data.events.length) {
            data.eventList = [...data.eventList, ...res.data.events];
            data.lasttime = res.data.lasttime;
          } else {
            data.disableScroll = true;
          }
        });
      } else if (p == "/FollowUserEvents") {
        getFollowEvent({
          pagesize: 10,
          lasttime: data.lasttime,
        }).then((res: any) => {
          if (data.lasttime == -1) {
            nextTick(() => {
              data.showContainer = true;
            });
          }
          data.size = res.data.size;
          if (res.data.event.length) {
            data.eventList = [...data.eventList, ...res.data.event];
            data.lasttime = res.data.lasttime;
          } else {
            data.disableScroll = true;
          }
        });
      } else if (props.actid) {
        getTopicEvent({
          actid: props.actid,
        }).then((res: any) => {
          nextTick(() => {
            data.showContainer = true;
          });
          data.eventList = res.data.events;
        });
      }
    };

    getUserDetail({
      uid: parseInt(router.currentRoute.value.query.id as string),
    }).then((res: any) => {
      data.userInfo = res.data.profile;
      console.log(data.userInfo);
      getData();
    });

    onMounted(() => {
      bus.on("refreshData", () => {
        data.eventList = [];
        data.lasttime = -1;
        getData();
      });

      // 删除动态
      bus.on("deleteEvent", (e: any) => {
        for (const [index, value] of data.eventList.entries()) {
          if (value.info.threadId == e) {
            deleteEvent({
              evId: value.id,
            }).then((res: any) => {
              if (res.data.code == 200) {
                ElNotification({
                  message: "删除动态成功",
                  type: "success",
                  customClass: "darkNotice",
                });
                data.eventList.splice(index, 1);
              }
            });
            return;
          }
        }
      });

      // 转发用户动态
      bus.on("shareEvent", (e: any) => {
        for (const value of data.eventList) {
          if (value.info.threadId == e) {
            _this.proxy.$toShare(value.id, "event", "", "", value.user.userId);
          }
        }
      });
    });
    return {
      ...toRefs(data),
      loadData,
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
    color: var(--textColor);
  }
  .eventItem {
    margin-bottom: 18px;
    .eventContent {
      margin-left: 60px;
      padding: 8px 12px;
      background: var(--eventBgc);
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