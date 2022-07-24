<template>
  <div class="audioEItem">
    <eventHead
      :text="'分享播客'"
      :avatarUrl="avatarUrl"
      :nickname="nickname"
      :time="time"
      :msg="msg"
      :target="target"
      :uid="uid"
    ></eventHead>
    <div @click="toAudioPage()" class="eventContent">
      <div style="display: flex; align-items: center">
        <div style="display: flex; align-items: center">
          <el-avatar
            shape="square"
            :size="40"
            :fit="'cover'"
            :src="info.djRadio.img80x80"
          />
        </div>
        <div style="margin-left: 10px">
          <div class="audioName">
            <span class="audioCate">{{ info.djRadio.category }}</span>
            {{ info.djRadio.name }}
          </div>
          <div class="audioArt">
            <span>by {{ info.djRadio.dj.nickname }}</span>
          </div>
        </div>
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
import { defineComponent, reactive, toRefs, watch } from "vue";
import eventHead from "./eventHead.vue";
import eventOperate from "./eventOperate.vue";
import eventPics from "./eventPics.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "audioEItem",
  components: {
    eventHead,
    eventOperate,
    eventPics
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
    const router = useRouter()
    const data = reactive({
      info: null,
      msg: "",
      id: 0
    });

    const toAudioPage = () => {
      router.push('/AudioDetail?audioId='+ data.id)
    }

    watch(
      () => props.infoJson,
      (n) => {
        if (n) {
          data.info = JSON.parse(n);
          data.id = JSON.parse(n).djRadio.id
          data.msg = JSON.parse(n)
            .msg.replaceAll(/#[^#]*#/g, "")
            .trim();
        }
      },
      { immediate: true }
    );
    return {
      ...toRefs(data),
      toAudioPage
    };
  },
});
</script>

<style lang='less'>
.audioEItem {
  .audioName {
    .audioCate {
      display: inline-block;
      color: @themeColor;
      padding: 3px 8px 4px;
      font-size: 12px;
      border: 1px solid @themeColor;
      transform: scale(0.75);
    }
  }
  .audioArt {
    color: @fontColor;
    font-size: 12px;
    span {
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>