<template>
  <div class="programEItem">
    <eventHead
      :text="'分享声音'"
      :avatarUrl="avatarUrl"
      :nickname="nickname"
      :time="time"
      :msg="msg"
      :target="target"
    ></eventHead>
    <div class="eventContent">
      <div style="display: flex; align-items: center">
        <div style="display: flex; align-items: center">
          <el-avatar
            shape="square"
            :size="40"
            :fit="'cover'"
            :src="info.program.blurCoverUrl"
          />
        </div>
        <div style="margin-left: 10px">
          <div class="programName">
            {{ info.program.name }}
          </div>
          <div class="programArt">
            <span>{{ info.program.radio.category }}</span>
            {{ info.program.radio.name }}
          </div>
        </div>
      </div>
    </div>
    <eventPics :pics='pics'></eventPics>
    <eventOperate
      :liked="liked"
      :likedCount="likedCount"
      :commentCount="commentCount"
      :shareCount="shareCount"
      :threadId="threadId"
    ></eventOperate>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch } from "vue";
import eventHead from "./eventHead.vue";
import eventOperate from "./eventOperate.vue";
import eventPics from "./eventPics.vue";

export default defineComponent({
  name: "programEItem",
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
    "pics"
  ],
  components: {
    eventHead,
    eventOperate,
    eventPics
  },
  setup(props) {
    const data = reactive({
      info: "",
      msg: "",
    });

    watch(
      () => props.infoJson,
      (n) => {
        if (n) {
          data.info = JSON.parse(n);
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
.programEItem {
  .eventContent {
    .programName {
      span {
        color: @fontColor;
      }
    }
    .programArt {
      margin-top: 5px;
      color: @fontColor;
      span {
        display: inline-block;
        color: @themeColor;
        padding: 3px 8px 4px;
        font-size: 12px;
        border: 1px solid @themeColor;
        transform: scale(0.75);
      }
    }
  }
}
</style>