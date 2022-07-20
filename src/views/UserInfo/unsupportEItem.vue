<template>
  <div class="unsupportEItem">
    <eventHead
      :text="'发布动态'"
      :avatarUrl="avatarUrl"
      :nickname="nickname"
      :time="time"
      :msg="msg"
      :target="target"
    ></eventHead>
    <eventPics :pics="pics"></eventPics>
    <div style="font-size: 12px;" class="eventNoData">
      Web端暂不支持显示
    </div>
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
import { defineComponent, reactive, watch, toRefs } from 'vue'
import eventHead from "./eventHead.vue";
import eventOperate from "./eventOperate.vue";
import eventPics from "./eventPics.vue";

export default defineComponent({
  name: 'unsupportEItem',
  components: {
    eventHead,
    eventOperate,
    eventPics,
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
    "disableOpe",
    "uid"
  ],
  setup(props) {
    const data = reactive({
      msg: "",
      info: <any>{},
    })
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
    }
  }
})
</script>

<style lang='less'>
.unsupportEItem {
  .eventNoData {
    margin-left: 60px;
    padding: 8px 12px;
    background: #393939;
    border-radius: 8px;
    text-align: center;
    font-size: 12px !important;
  }
}
</style>