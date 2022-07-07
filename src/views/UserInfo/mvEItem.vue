<template>
  <div class="mvEItem">
    <eventHead
      :text="'分享MV'"
      :avatarUrl="avatarUrl"
      :nickname="nickname"
      :time="time"
      :msg="msg"
      :target="target"
    ></eventHead>
    <div class="mvContent">
      <div class="topMask">
        <span style="margin-left:15px">{{info.mv.name}}</span>
      </div>
      <img class="cover" :src="info.mv.imgurl16v9" alt="" />
      <img class="icon" src="~images/common/sheetPlay.png" alt="" />
      <div class="mask">
        <div style="margin-left: 10px">
        </div>
        <div style="margin-right: 10px">
          {{ $countFormat(info.mv.playCount) }}
        </div>
      </div>
    </div>
    <eventPics :pics="pics"></eventPics>
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
  name: "mvEItem",
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
  ],
  setup(props) {
    const data = reactive({
      info: null,
      msg: "",
      id: 0,
    });

    watch(
      () => props.infoJson,
      (n) => {
        if (n) {
          data.info = JSON.parse(n);
          // data.id = JSON.parse(n).djRadio.id
          data.msg = JSON.parse(n)
            .msg.replaceAll(/#[^#]*#/g, "")
            .trim();
          console.log(data.info);
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
.mvEItem {
  .mvContent {
    width: 420px;
    height: 240px;
    position: relative;
    margin-left: 60px;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    .cover {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .icon {
      position: relative;
      width: 50px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .topMask {
      position: absolute;
      display: flex;
      align-items: center;
      font-size: 13.5px;
      z-index: 2;
      top: 0;
      width: 100%;
      height: 40px;
      background-image: linear-gradient(#000, transparent);
    }
    .mask {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40px;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13.5px;
      background-image: linear-gradient(transparent, #000);
    }
  }
}
</style>