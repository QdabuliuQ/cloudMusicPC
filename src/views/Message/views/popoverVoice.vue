<template>
  <div class="popoverVoice">
    <div v-if="uid != userInfo.userId" class="unselfContainer">
      <popoverUser :userInfo="userInfo" />
      <div
        @click="controlVoice"
        style="margin-left: 10px"
        v-if="msg"
        class="popoverInfoContainer unselfPopover voicePopoverContainer"
      >
        <div class="voiceContainer">
          <img v-if="!statue" class="controlIcon" src="~images/message/play.png" alt="" />
          <img v-else class="controlIcon" src="~images/message/pause.png" alt="" />
          <img class="voiceIcon" src="~images/message/voice.png" alt="" />
          <span>{{ msg.voiceVO.duration }}<em>''</em></span>
        </div>
      </div>
    </div>
    <div v-else class="selfContainer">
      <div
        @click="controlVoice"
        style="margin-right: 10px"
        v-if="msg"
        class="popoverInfoContainer selfPopover voicePopoverContainer"
      >
        <div class="voiceContainer">
          <img v-if="!statue" class="controlIcon" src="~images/message/play.png" alt="" />
          <img v-else class="controlIcon" src="~images/message/pause.png" alt="" />
          <img class="voiceIcon" src="~images/message/voice.png" alt="" />
          <span>{{ msg.voiceVO.duration }}<em>''</em></span>
        </div>
      </div>
      <popoverUser :userInfo="userInfo" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch } from "vue";
import popoverUser from "./popoverUser.vue";
export default defineComponent({
  name: "popoverVoice",
  props: ["userInfo", "msg", "index", "activeVoiceIndex"],
  components: {
    popoverUser,
  },
  setup(props, context) {
    const data = reactive({
      uid: decodeURIComponent(
        window.atob(localStorage.getItem("id") as string)
      ),
      statue: false                                                                                                                 
    });

    const controlVoice = () => {
      context.emit('controlVoice', {
        i: props.index,
        url: props.msg.voiceVO.voiceUrl
      })
    }

    watch(() => props.activeVoiceIndex, (n) => {
      if (n == props.index) {
        data.statue = true
      } else {
        data.statue = false
      }
    })

    return {
      controlVoice,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.popoverVoice {
  .voicePopoverContainer {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .voiceContainer {
    padding-top: 2px;
    display: flex;
    align-items: center;
    color: #fff;
    .controlIcon {
      width: 20px;
    }
    .voiceIcon {
      width: 26px;
      margin: 0 8px;
    }
    span {
      font-weight: bold;

    }
  }
}
</style>