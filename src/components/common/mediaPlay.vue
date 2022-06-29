<template>
  <div id="mediaPlay">
    <video
      ref="videoRef"
      @canplay="canplayEvent"
      id="mediaContainer"
      :src="src"
      autoplay
    ></video>
    <div class="bottomContorlPanel">
      <div
        v-show="isShowPopover"
        ref="popover"
        :style="{ left: popoverLeft + 'px' }"
        class="popover"
      >
        {{ pointVideoText }}
      </div>
      <el-slider
        ref="sliderRef"
        @mousemove="mousemoveEvent"
        @mouseout="mouseoutEvent"
        v-model="value"
        :show-tooltip="false"
      />
      <div class="btnPanel">
        <div class="leftPanel">
          <img v-if="isPlay" src="~images/common/stop.png" alt="" />
          <img v-else src="~images/common/play.png" alt="" />
          <span>{{ newVideoText }} / {{ videoLengthText }}</span>
        </div>
        <div class="rightPanel">
          <div class="shoutPanel">
            <img
              v-if="volumeValue == 0"
              src="~images/common/volumeZero.png"
              alt=""
            />
            <img
              v-else-if="volumeValue > 0 && volumeValue <= 30"
              src="~images/common/volumeLow.png"
              alt=""
            />
            <img
              v-else-if="volumeValue > 30 && volumeValue <= 60"
              src="~images/common/volumeMiddle.png"
              alt=""
            />
            <img
              v-else-if="volumeValue > 60 && volumeValue <= 100"
              src="~images/common/volumeHigh.png"
              alt=""
            />
            <el-slider v-model="volumeValue" :show-tooltip="false" />
          </div>
          <img class="screenIcon" src="~images/common/fullscreen.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";
export default defineComponent({
  name: "mediaPlay",
  props: ["src"],
  setup() {
    const data = reactive({
      value: 0,
      isPlay: true,
      videoLengthText: "00:00",
      newVideoText: "00:00",
      pointVideoText: "00:00",
      isShowPopover: false,
      popoverLeft: 0,
      volumeValue: 0,
    });
    const videoRef = ref();
    const popover = ref();
    const sliderRef = ref()
    let per: number = 0
    let duration: number = 0

    // 监听video是否加载完毕
    const canplayEvent = () => {
      let min = Math.floor(videoRef.value.duration / 60);
      per = videoRef.value.duration / (document.querySelector('.el-slider')?.clientWidth as number)
      duration = videoRef.value.duration
      let second = Math.floor(videoRef.value.duration % 60);
      data.videoLengthText = `${min < 10 ? "0" + min : min}:${
        second < 10 ? "0" + second : second
      }`;
    };

    // 监听鼠标移入进度条事件
    const mousemoveEvent = (e: any) => {
      if (!data.isShowPopover) {
        data.isShowPopover = true;
      }
      
      let min = Math.floor(per * e.offsetX / 60);
      let second = Math.floor(per * e.offsetX % 60);
      data.pointVideoText = `${min < 10 ? "0" + min : min}:${
        second < 10 ? "0" + second : second
      }`;

      let n = e.offsetX - 27.5;
      if (n >= 0) {
        data.popoverLeft = n;
      } else {
        data.popoverLeft = 0;
      }
    };

    const mouseoutEvent = () => {
      if (data.isShowPopover) {
        data.isShowPopover = false;
      }
    }

    onMounted(() => {
      // sliderWidth =  as number;
    });
    return {
      ...toRefs(data),
      videoRef,
      popover,
      sliderRef,
      canplayEvent,
      mousemoveEvent,
      mouseoutEvent,
    };
  },
});
</script>

<style lang='less'>
#mediaPlay {
  width: 100%;
  height: 100%;
  position: relative;

  .el-slider {
    height: auto;
    .el-slider__runway {
      height: 4px;
      background-color: #363639;
    }
    .el-slider__bar {
      height: 4px;
      background-color: @themeColor;
      border-radius: 0;
    }
    .el-slider__button {
      height: 15px;
      width: 15px;
      border: solid 2px @themeColor;
    }
  }
  #mediaContainer {
    width: 100%;
    height: 100%;
  }
  .bottomContorlPanel {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 45px;
    background-color: #000;
    z-index: 10;
    .popover {
      position: absolute;
      padding: 6px 10px;
      font-size: 12px;
      bottom: 55px;
      background-color: #000;
      box-sizing: border-box;
      border: 1px solid #696969;
      border-radius: 4px;
      &::after {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        border: 6px solid #696969;
        border-top-color: #000;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
      }
      &::before {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        border: 8px solid #696969;
        border-top-color: #696969;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
        bottom: -16px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .btnPanel {
      width: 95%;
      margin: 3px auto 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .leftPanel {
        display: flex;
        align-items: center;
        img {
          width: 28px;
          cursor: pointer;
          opacity: 0.7;
          &:hover {
            opacity: 1;
          }
        }
        span {
          margin-left: 7px;
          font-size: 13px;
          color: @fontColor;
        }
      }
      .rightPanel {
        display: flex;
        align-items: center;
        .shoutPanel {
          display: flex;
          align-items: center;
          margin-right: 15px;
          .el-slider {
            width: 90px;
          }
          img {
            width: 20px;
            margin-right: 5px;
          }
        }
        .screenIcon {
          width: 33px;
          opacity: 0.7;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>