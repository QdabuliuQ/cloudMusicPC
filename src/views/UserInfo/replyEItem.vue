<template>
  <div class="replyEItem">
    <eventHead
      :text="'转发'"
      :avatarUrl="avatarUrl"
      :nickname="nickname"
      :time="time"
      :msg="msg"
    ></eventHead>
    <div class="eventContent"></div>
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
import { defineComponent, reactive, toRefs, watch } from 'vue'
import eventHead from "./eventHead.vue";
import eventOperate from "./eventOperate.vue";
import eventPics from "./eventPics.vue";

export default defineComponent({
  name: 'replyEItem',
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
    "pics"
  ],
  setup(props) {
    const data = reactive({
      info: null,
      msg: ''
    })
    
    watch(()=>props.infoJson, (n)=> {
      if (n) {
        data.info = JSON.parse(n)
        data.msg = JSON.parse(n)
            .msg.replaceAll(/#[^#]*#/g, "")
            .trim();
          console.log(data.info);
      }
    }, {immediate: true})

    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.replyEItem {

}
</style>