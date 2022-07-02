<template>
  <div
    ref="mediaPlayRef"
    id="mediaPlay"
    @mousemove="moveEvent"
    @mouseleave="leaveEvent"
  >
    <!-- @mouseenter="" -->
    <div :class="[miniModel ? 'miniModel' : '']">
      <video
        muted="muted"
        ref="videoRef"
        @canplay="canplayEvent"
        @ended="endedEvent"
        @waiting="waitingEvent"
        id="mediaContainer"
        :src="src"
        autoplay
      ></video>
      <div
        :class="[
          isShowControl ? 'activeControlPanel' : '',
          'bottomControlPanel',
        ]"
      >
        <div
          v-show="isShowPopover"
          ref="popover"
          :style="{ left: popoverLeft + 'px' }"
          class="popover"
        >
          {{ pointVideoText }}
        </div>
        <el-slider
          @click="setProgressEvent"
          ref="sliderRef"
          v-model="value"
          :show-tooltip="false"
        />
        <div class="btnPanel">
          <div class="leftPanel">
            <img
              @click="playMedia('stop')"
              v-if="isPlay"
              src="~images/common/stop.png"
              alt=""
            />
            <img
              @click="playMedia('play')"
              v-else
              src="~images/common/play.png"
              alt=""
            />
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
            <img
              @click="fullScreen"
              v-if="!isFullScreen"
              class="screenIcon"
              src="~images/common/fullscreen.png"
              alt=""
            />
            <img
              @click="exitFullscreen"
              v-else
              class="screenIcon"
              src="~images/common/unfullscreen.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div v-show="value == 100" class="endPanel">
        <div @click="replayEvent" class="panelBtn">
          <img src="~images/common/replay.png" alt="" />
          <div>重新播放</div>
        </div>
      </div>
      <div v-show="isLoading && value != 100" class="loadPanel">
        <img src="~images/common/loading.png" alt="" />
        努力加载中
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, ref, watch } from "vue";
export default defineComponent({
  name: "mediaPlay",
  props: ["src", "miniModel"],
  setup(props) {
    const data = reactive({
      value: 0, // 播放条进度
      isPlay: true, // 是否开启播放
      videoLengthText: "00:00", // 总时间
      newVideoText: "00:00", // 实时播放时间
      pointVideoText: "00:00", // popover时间
      isShowPopover: false, // 是否显示popover
      popoverLeft: 0, // popover偏移量
      volumeValue: 100, // 音量
      isShowControl: false, // 是否显示底部控制面板
      isLoading: false, // 是否正在缓冲
      isFullScreen: false, // 是否全屏
    });
    const videoRef = ref();
    const popover = ref();
    const sliderRef = ref();
    const mediaPlayRef = ref();
    let per: number = 0;
    let addPer: number = 0;
    let valuePer: number = 0;
    let duration: number = 0;
    let timer: any = null;
    let maxOffset: number = 0;
    let offset: number = 0;
    let moveTimer: any = null

    // 鼠标移入播放器事件
    const moveEvent = () => {
      if (!props.miniModel && !data.isShowControl) {
        data.isShowControl = true
      } else if(!props.miniModel && data.isShowControl){
        if (moveTimer) {
          clearTimeout(moveTimer)
        }
        moveTimer = setTimeout(() => {
          data.isShowControl = false;
        }, 1000);
      }
    }

    const leaveEvent = () => {
      if (!props.miniModel) {
        data.isShowControl = false;
      }
    };

    // 监听video缓冲
    const waitingEvent = () => {
      data.isLoading = true;
      if (timer) {
        clearInterval(timer);
      }
    };

    const computedDom = () => {
      setTimeout(() => {
        let width = document.querySelector(".el-slider")?.clientWidth as number;
        maxOffset = width - 27.5;
        offset = width - 55;
        per = videoRef.value.duration / width;
      }, 100);
    };

    // 开启全屏
    const fullScreen = () => {
      let dom = mediaPlayRef.value;
      data.isFullScreen = true;
      if (dom.requestFullscreen) {
        dom.requestFullscreen();
      } else if (dom.mozRequestFullScreen) {
        dom.mozRequestFullScreen();
      } else if (dom.webkitRequestFullscreen) {
        dom.webkitRequestFullscreen();
      } else if (dom.msRequestFullscreen) {
        dom.msRequestFullscreen();
      }
      computedDom();
    };

    const exitFullscreen = () => {
      data.isFullScreen = false;
      document.exitFullscreen();
      computedDom();
    };

    // 监听video是否加载完毕
    const canplayEvent = () => {
      if (data.isLoading) {
        data.isLoading = false;
      }
      computedDom();

      valuePer = videoRef.value.duration / 100;
      addPer = 100 / videoRef.value.duration;
      duration = videoRef.value.duration;
      let second = Math.floor(videoRef.value.duration % 60);
      let min = Math.floor(videoRef.value.duration / 60);
      data.videoLengthText = `${min < 10 ? "0" + min : min}:${
        second < 10 ? "0" + second : second
      }`;
      videoRef.value.play(); // 播放视频
      timer = setInterval(intervalTime, 1000);
    };

    // 循环计时
    const intervalTime = () => {
      getTime(videoRef.value.currentTime, "new");
      if (data.value >= 100) {
        data.value = 100;
        clearInterval(timer);
      } else {
        data.value = addPer * videoRef.value.currentTime;
      }
    };

    // 监听鼠标移入进度条事件
    const mousemoveEvent = (e: any) => {
      if (!data.isShowPopover) {
        data.isShowPopover = true;
      }
      getTime(per * e.offsetX, "point");

      if (e.offsetX >= 27.5 && e.offsetX < maxOffset) {
        data.popoverLeft = e.offsetX - 27.5;
      } else if (e.offsetX >= maxOffset) {
        data.popoverLeft = offset;
      } else {
        data.popoverLeft = 0;
      }
    };

    // 鼠标移出事件
    const mouseoutEvent = () => {
      if (data.isShowPopover) {
        data.isShowPopover = false;
      }
    };

    // 更新时间
    const getTime = (t: number, saveObj: string) => {
      let min = Math.floor(t / 60);
      let second = Math.floor(t % 60);
      if (saveObj == "point") {
        data.pointVideoText = `${min < 10 ? "0" + min : min}:${
          second < 10 ? "0" + second : second
        }`;
      } else {
        data.newVideoText = `${min < 10 ? "0" + min : min}:${
          second < 10 ? "0" + second : second
        }`;
      }
    };

    // 播放/暂停
    const playMedia = (s: string) => {
      if (s == "stop") {
        // 点击暂停
        clearInterval(timer);
        videoRef.value.pause();
        data.isPlay = false;
      } else {
        if (data.value == 100) {
          // 重新播放
          data.value = 0;
          videoRef.value.currentTime = 0;
        }
        timer = setInterval(intervalTime, 1000);
        videoRef.value.play();
        data.isPlay = true;
      }
    };

    // 切换进度条进度
    const setProgressEvent = () => {
      let t = Math.floor(data.value * valuePer);
      videoRef.value.currentTime = t;
      getTime(t, "new");
      if (videoRef.value.pause) {
        videoRef.value.play();
        data.isPlay = true;
      }
    };

    // 重新播放
    const replayEvent = () => {
      data.value = 0;
      timer = setInterval(intervalTime, 1000);
      videoRef.value.play(); // 播放视频
      data.isPlay = true;
    };

    // 播放结束监听
    const endedEvent = () => {
      if (timer) {
        // 清楚定时器
        data.value = 100;
        getTime(videoRef.value.duration, "new");
        clearInterval(timer);
        data.isPlay = false;
      }
    };

    watch(
      () => data.volumeValue,
      (n) => {
        videoRef.value.volume = n / 100;
      }
    );

    watch(
      () => props.miniModel,
      (newVal) => {
        if (!newVal) {
          computedDom();
        }
      }
    );

    onMounted(() => {
      // sliderWidth =  as number;
      let sliderDom = <HTMLElement>document.querySelector(".el-slider");
      sliderDom?.addEventListener("mousemove", mousemoveEvent);
      sliderDom?.addEventListener("mouseout", mouseoutEvent);

      let sliderBtn = <HTMLElement>(
        document.querySelector(".el-slider__button-wrapper")
      );
      sliderBtn?.addEventListener("mouseenter", () => {
        sliderDom?.removeEventListener("mousemove", mousemoveEvent);
      });

      sliderBtn?.addEventListener("mouseleave", () => {
        sliderDom?.addEventListener("mousemove", mousemoveEvent);
      });
    });
    return {
      ...toRefs(data),
      videoRef,
      popover,
      sliderRef,
      mediaPlayRef,
      moveEvent,
      leaveEvent,
      canplayEvent,
      playMedia,
      setProgressEvent,
      endedEvent,
      replayEvent,
      waitingEvent,
      fullScreen,
      exitFullscreen,
    };
  },
});
</script>

<style lang='less'>
#mediaPlay {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  video::-webkit-media-controls-enclosure {
    display: none;
  }

  .miniModel {
    position: fixed;
    width: 400px;
    height: 200px;
    bottom: 40px;
    right: 40px;
    z-index: 10;
    background-color: #000;
  }

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

  .activeControlPanel {
    bottom: 0 !important;
    opacity: 1 !important;
  }
  .bottomControlPanel {
    position: absolute;
    bottom: -45px;
    opacity: 0;
    left: 0;
    right: 0;
    height: 45px;
    background-color: #000;
    transition: 0.2s all linear;
    .fullscreenMask {
      width: 100%;
      height: 45px;
      position: absolute;
      top: -45px;
      background-color: transparent;
    }
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
  .loadPanel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    font-size: 13px;
    border-radius: 8px;
    img {
      width: 30px;
      margin-right: 7px;
      animation: rotateAnimate 1s linear infinite;
    }
    @keyframes rotateAnimate {
      100% {
        transform: rotate(360deg);
      }
    }
  }
  .endPanel {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    background-color: #000;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .panelBtn {
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      img {
        width: 40%;
        margin-bottom: 7px;
      }
    }
  }
}
</style>