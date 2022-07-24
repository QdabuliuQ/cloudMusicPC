 <template>
  <div class="replyEItem">
    <eventHead
      :text="'转发'"
      :avatarUrl="avatarUrl"
      :nickname="nickname"
      :time="time"
      :msg="msg"
      :uid="uid"
    ></eventHead>
    <div class="replyEventContent">
      <songEItem
        class="eventItem"
        v-if="event.type == 18"
        :nickname="event.user.nickname"
        :time="event.showTime"
        :infoJson="event.json"
        :target="event.bottomActivityInfos"
        :liked="event.info.liked"
        :threadId="event.info.threadId"
        :likedCount="event.info.likedCount"
        :commentCount="event.info.commentCount"
        :shareCount="event.info.shareCount"
        :pics="event.pics"
        :disableOpe="true"
      ></songEItem>
      <albumEItem
        class="eventItem"
        v-else-if="event.type == 19"
        :nickname="event.user.nickname"
        :time="event.showTime"
        :infoJson="event.json"
        :target="event.bottomActivityInfos"
        :liked="event.info.liked"
        :threadId="event.info.threadId"
        :likedCount="event.info.likedCount"
        :commentCount="event.info.commentCount"
        :shareCount="event.info.shareCount"
        :pics="event.pics"
        :disableOpe="true"
      ></albumEItem>
      <audioEItem
        class="eventItem"
        v-else-if="event.type == 28"
        :nickname="event.user.nickname"
        :time="event.showTime"
        :infoJson="event.json"
        :target="event.bottomActivityInfos"
        :liked="event.info.liked"
        :threadId="event.info.threadId"
        :likedCount="event.info.likedCount"
        :commentCount="event.info.commentCount"
        :shareCount="event.info.shareCount"
        :pics="event.pics"
        :disableOpe="true"
      ></audioEItem>
      <programEItem
        class="eventItem"
        v-else-if="event.type == 17"
        :nickname="event.user.nickname"
        :time="event.showTime"
        :infoJson="event.json"
        :target="event.bottomActivityInfos"
        :liked="event.info.liked"
        :threadId="event.info.threadId"
        :likedCount="event.info.likedCount"
        :commentCount="event.info.commentCount"
        :shareCount="event.info.shareCount"
        :pics="event.pics"
        :disableOpe="true"
      ></programEItem>
      <sheetEItem
        class="eventItem"
        v-else-if="event.type == 13"
        :nickname="event.user.nickname"
        :time="event.showTime"
        :infoJson="event.json"
        :target="event.bottomActivityInfos"
        :liked="event.info.liked"
        :threadId="event.info.threadId"
        :likedCount="event.info.likedCount"
        :commentCount="event.info.commentCount"
        :shareCount="event.info.shareCount"
        :pics="event.pics"
        :disableOpe="true"
      ></sheetEItem>
      <videoEItem
        class="eventItem"
        v-else-if="event.type == 41"
        :nickname="event.user.nickname"
        :time="event.showTime"
        :infoJson="event.json"
        :target="event.bottomActivityInfos"
        :liked="event.info.liked"
        :threadId="event.info.threadId"
        :likedCount="event.info.likedCount"
        :commentCount="event.info.commentCount"
        :shareCount="event.info.shareCount"
        :pics="event.pics"
        :disableOpe="true"
      ></videoEItem>
      <mvEItem
        class="eventItem"
        v-else-if="event.type == 21"
        :nickname="event.user.nickname"
        :time="event.showTime"
        :infoJson="event.json"
        :target="event.bottomActivityInfos"
        :liked="event.info.liked"
        :threadId="event.info.threadId"
        :likedCount="event.info.likedCount"
        :commentCount="event.info.commentCount"
        :shareCount="event.info.shareCount"
        :pics="event.pics"
        :disableOpe="true"
      ></mvEItem>
      <commentEItem
        class="eventItem"
        v-else-if="event.type == 31"
        :nickname="event.user.nickname"
        :time="event.showTime"
        :infoJson="event.json"
        :target="event.bottomActivityInfos"
        :liked="event.info.liked"
        :threadId="event.info.threadId"
        :likedCount="event.info.likedCount"
        :commentCount="event.info.commentCount"
        :shareCount="event.info.shareCount"
        :pics="event.pics"
        :disableOpe="true"
      ></commentEItem>
      <div v-else style="text-align: center; padding: 15px 0" class="unSupport">
        暂无支持显示该动态类型
      </div>
    </div>
    <eventPics :pics="pics"></eventPics>
    <eventOperate
      :liked="liked"
      :uid="uid"
      :likedCount="likedCount"
      :commentCount="commentCount"
      :shareCount="shareCount"
      :threadId="threadId"
    ></eventOperate>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  defineAsyncComponent,
} from "vue";
// 异步加载组件
const eventHead = defineAsyncComponent(() => import("./eventHead.vue"));
const eventOperate = defineAsyncComponent(() => import("./eventOperate.vue"));
const eventPics = defineAsyncComponent(() => import("./eventPics.vue"));
const songEItem = defineAsyncComponent(() => import("./songEItem.vue"));
const albumEItem = defineAsyncComponent(() => import("./albumEItem.vue"));
const audioEItem = defineAsyncComponent(() => import("./audioEItem.vue"));
const programEItem = defineAsyncComponent(() => import("./programEItem.vue"));
const sheetEItem = defineAsyncComponent(() => import("./sheetEItem.vue"));
const videoEItem = defineAsyncComponent(() => import("./videoEItem.vue"));
const mvEItem = defineAsyncComponent(() => import("./mvEItem.vue"));
const commentEItem = defineAsyncComponent(() => import("./commentEItem.vue"));

export default defineComponent({
  name: "replyEItem",
  components: {
    eventHead,
    eventOperate,
    eventPics,
    songEItem,
    albumEItem,
    audioEItem,
    programEItem,
    sheetEItem,
    videoEItem,
    mvEItem,
    commentEItem,
  },
  props: [
    "avatarUrl",
    "nickname",
    "time",
    "infoJson",
    "target",
    "threadId",
    "liked",
    "likedCount",
    "commentCount",
    "shareCount",
    "pics",
    "uid",
  ],
  setup(props) {
    const data = reactive({
      event: null,
      msg: "",
    });

    watch(
      () => props.infoJson,
      (n) => {
        if (n) {
          data.event = JSON.parse(n).event;
          data.msg = JSON.parse(n)
            .msg.replaceAll(/#[^#]*#/g, "")
            .trim();
        }
      },
      { immediate: true }
    );

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.replyEItem {
  .replyEventContent {
    margin-left: 60px;
    padding: 8px 12px;
    background: @eventBgc;
    border-radius: 8px;
    font-size: 13px;
    cursor: pointer;
    .eventHead {
      .rightInfo {
        margin-left: 0 !important;
      }
    }
    .eventContent {
      margin-left: 0 !important;
      background: #333333 !important;
    }
    .eventPics {
      margin-left: 0 !important;
    }
  }
}
</style>