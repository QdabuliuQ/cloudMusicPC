<template>
  <div class="sheetEItem">
    <eventHead
      :text="'分享歌单'"
      :avatarUrl="avatarUrl"
      :nickname="nickname"
      :time="time"
      :msg="msg"
      :target="target"
      :uid="uid"
    ></eventHead>
    <div @click="router.push('/SheetDetail?id='+data.id)" class="eventContent">
      <div style="display: flex; align-items: center">
        <div style="display: flex; align-items: center">
          <el-avatar
            shape="square"
            :size="40"
            :fit="'cover'"
            :src="info.playlist.coverImgUrl"
          />
        </div>
        <div style="margin-left: 10px">
          <div class="sheetName">
            <span class="sheetCate">歌单</span>
            {{ info.playlist.name }}
          </div>
          <div @click.stop="router.push('/UserDetail?id='+ info.playlist.creator.userId)" class="sheetArt">
            <span>{{ info.playlist.creator.nickname }}</span>
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
  name: "sheetEItem",
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
      info: null,
      msg: "",
      id: 0
    });
    const router = useRouter()

    watch(
      () => props.infoJson,
      (n) => {
        if (n) {
          data.info = JSON.parse(n);
          data.id = JSON.parse(n).playlist.id
          data.msg = JSON.parse(n)
            .msg.replaceAll(/#[^#]*#/g, "")
            .trim();
        }
      },
      { immediate: true }
    );
    return {
      ...toRefs(data),
      router,
    };
  },
});
</script>

<style lang='less'>
.sheetEItem {
  .eventContent {
    .sheetName {
      color: var(--textColor);
      .sheetCate {
        display: inline-block;
        color: @themeColor;
        padding: 3px 8px 4px;
        font-size: 12px;
        border: 1px solid @themeColor;
        transform: scale(0.75);
      }
      span {
        color: @fontColor;
      }
    }
    .sheetArt {
      color: @fontColor;
      span {
        cursor: pointer;
        &:hover {
          color: var(--textColor);
        }
      }
    }
  }
}
</style>