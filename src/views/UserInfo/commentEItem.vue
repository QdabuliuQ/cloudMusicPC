<template>
  <div class="commentEItem">
    <eventHead
      :text="'分享评论'"
      :avatarUrl="avatarUrl"
      :nickname="nickname"
      :time="time"
      :msg="msg"
      :target="target"
    ></eventHead>
    <div v-if="resourceInfo" class="eventContent">
      <div style="display: flex; align-items: center; padding: 5px 0 7px; border-bottom: 1px solid rgb(83 83 83)">
        <img class="icon" src="~images/common/char.png" alt="" />
        <div style="display: flex; align-items: center">
          <span class="username">{{ info.resource.user.nickname }}</span
          >:&nbsp; {{ info.resource.content }}
        </div>
      </div>
      <div class="resourse">
        来自单曲 {{resourceInfo.name}} -- <span v-for="item in resourceInfo.artists" :key="item.id">{{item.name}}&nbsp;&nbsp;</span>
      </div>
    </div>
    <div v-else style="font-size: 12px;" class="eventNoData">
      该评论已删除
    </div>
    <eventPics :pics="pics"></eventPics>
    <eventOperate
      v-if="!disableOpe"
      :liked="liked"
      :likedCount="likedCount"
      :commentCount="commentCount"
      :shareCount="shareCount"
      :threadId="threadId"
      :uid="uid"
    ></eventOperate>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch } from "vue";
import eventHead from "./eventHead.vue";
import eventOperate from "./eventOperate.vue";
import eventPics from "./eventPics.vue";

export default defineComponent({
  name: "commentEItem",
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
    "disableOpe",
    "uid"
  ],
  components: {
    eventHead,
    eventOperate,
    eventPics,
  },
  setup(props) {
    const data = reactive({
      info: <any>{},
      msg: "",
      resourceInfo: null
    });

    watch(
      () => props.infoJson,
      (n) => {
        if (n) {
          data.info = JSON.parse(n);
          data.resourceInfo = data.info.resource ? JSON.parse(JSON.parse(n).resource.resourceInfo) : null
          data.msg = JSON.parse(n)
            .msg.replaceAll(/#[^#]*#/g, "")
            .trim();
          console.log(data.resourceInfo);
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
.commentEItem {
  .eventNoData {
    margin-left: 60px;
    padding: 8px 12px;
    background: #393939;
    border-radius: 8px;
    text-align: center;
    font-size: 12px !important;
  }
  .eventContent {
    position: relative;
    font-size: 14px !important;
    .icon {
      margin-right: 7px;
    }
    .username {
      color: @nameColor;
      cursor: pointer;
    }
    .resourse {
      padding: 10px 0;
      font-size: 12px;
      color: @fontColor;
    }
  }
}
</style>