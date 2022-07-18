<template>
  <div class="textEItem">
    <eventHead
      :text="'发布动态'"
      :avatarUrl="avatarUrl"
      :nickname="nickname"
      :time="time"
      :msg="msg"
      :target="target"
    ></eventHead>
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
import { defineComponent, reactive, watch, toRefs } from 'vue'
import eventHead from "./eventHead.vue";
import eventOperate from "./eventOperate.vue";
import eventPics from "./eventPics.vue";

export default defineComponent({
  name: 'textEItem',
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
      info: <any>{},
      msg: "",
      id: 0,
      pics: <any>[]
    });

    watch(
      () => props.infoJson,
      (n) => {
        if (n) {
          data.info = JSON.parse(n);
          console.log(data.info);
          for (const item of data.info?.resource.mlogDetail.content.image) {
            data.pics.push({
              originUrl: item.imageUrl,
              pcSquareUrl: item.imageUrl
            })
          }
          // data.id = JSON.parse(n).djRadio.id
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
.textEItem {

}
</style>