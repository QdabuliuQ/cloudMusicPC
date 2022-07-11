<template>
  <div class="videoEItem">
    <eventHead
      :text="'分享视频'"
      :avatarUrl="avatarUrl"
      :nickname="nickname"
      :time="time"
      :msg="msg"
      :target="target"
    ></eventHead>
    <div @click="toVideoPage" class="videoContent">
      <img class="cover" :src="info.video.coverUrl" alt="">
      <img class="icon" src="~images/common/sheetPlay.png" alt="">
      <div class="mask">
        <div style="margin-left: 10px" class="count">{{$countFormat(info.video.playTime)}}</div>
        <div style="margin-right: 10px" class="duration">{{$formatTime(info.video.durationms)}}</div>
      </div>
    </div>
    <eventPics :pics='pics'></eventPics>
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
import { defineComponent, reactive, toRefs, watch } from 'vue'
import eventHead from "./eventHead.vue";
import eventOperate from "./eventOperate.vue";
import eventPics from "./eventPics.vue";
import { useRouter } from "vue-router";
import router from '@/router';

export default defineComponent({
  name: 'videoEItem',
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
    eventPics
  },
  setup(props) {
    const data = reactive({
      info: '',
      msg: '',
      id: 0
    })

    const toVideoPage = () => {
      router.push(`/VideoPlay?id=${data.id}&type=video`)
    }

    watch(
      () => props.infoJson,
      (n) => {
        if (n) {
          data.info = JSON.parse(n);
          data.id = JSON.parse(n).video.videoId
          data.msg = JSON.parse(n)
            .msg.replaceAll(/#[^#]*#/g, "")
            .trim();
        }
      },
      { immediate: true }
    );
    return {
      ...toRefs(data),
      toVideoPage
    }
  }
})
</script>

<style lang='less'>
.videoEItem {
  .videoContent {
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