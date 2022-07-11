<template>
  <div class="albumEItem">
    <eventHead
      :text="'分享专辑'"
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
            :src="info.album.img80x80"
          />
        </div>
        <div style="margin-left: 10px">
          <div class="songName">
            {{ info.album.name }}
            <span
              v-if="info.album.alias.length"
              :key="index"
              v-for="(item, index) in info.album.alias"
            >
              ({{ item }})
            </span>
          </div>
          <div class="songArt">
            <span v-for="item in info.album.artists" :key="item.id"
              >{{ item.name }}&nbsp;&nbsp;</span
            >
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
import { defineComponent, reactive, onMounted, toRefs, watch } from 'vue'
import eventHead from "./eventHead.vue";
import eventOperate from "./eventOperate.vue";
import eventPics from "./eventPics.vue";

export default defineComponent({
  name: 'albumEItem',
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
      info: null,
      msg: ''
    })

    watch(()=>props.infoJson, (n) => {
      if (n) {
        data.info = JSON.parse(n)
        data.msg = JSON.parse(n)
            .msg.replaceAll(/#[^#]*#/g, "")
            .trim();
      }
    }, {immediate: true})

    onMounted(() => {
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.albumEItem {
  .eventContent {
    .songName {
      span {
        color: @fontColor;
      }
    }
    .songArt {
      margin-top: 5px;
      color: @fontColor;
      span {
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>