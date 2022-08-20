<template>
  <div id="toggleSubject">
    <div class="subjectTitle">主题</div>
    <div class="subjectContaienr">
      <div class="subjectItem">
        <div @click="toggleEvent('dark')" class="subjectContent dark">
          <img class="logo" src="~images/common/logo.png" alt="" />
          <img class="bgImage" src="~images/common/subjectBgImage.png" alt="" />
          <img
            v-show="theme == 'auto'"
            class="select"
            src="~images/musicNavBar/select.png"
            alt=""
          />
        </div>
        <div class="itemTitle">炫酷黑</div>
      </div>
      <div class="subjectItem">
        <div @click="toggleEvent('light')" class="subjectContent light">
          <img class="logo" src="~images/common/logo.png" alt="" />
          <img class="bgImage" src="~images/common/subjectBgImage.png" alt="" />
          <img
            v-show="theme == 'light' && !color"
            class="select"
            src="~images/musicNavBar/select.png"
            alt=""
          />
        </div>
        <div class="itemTitle">官方红</div>
      </div>
    </div>
    <div class="subjectTitle">自定义颜色</div>
    <el-slider
      @change="sliderChange"
      @click="sliderChange"
      class="subjectSliderClass"
      :size="'small'"
      v-model="value"
      :show-tooltip="false"
    />
    <canvas style="display: none" id="sliderCanvas"></canvas>
  </div>
</template>

<script lang='ts'>
import { defineComponent, nextTick, reactive, toRefs, watch } from "vue";
import { useDark, useToggle } from "@vueuse/core";

let ctx: any;
export default defineComponent({
  name: "toggleSubject",
  props: ["popoShow"],
  setup(props) {
    const isDark: any = useDark({
      // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
      storageKey: "useDarkKEY",
      // 暗黑class名字
      valueDark: "dark",
      // 高亮class名字
      valueLight: "light",
    });
    const data = reactive({
      theme: localStorage.getItem('useDarkKEY'),
      value: 0,
      color: localStorage.getItem('themeColor')
    });
    
    const toggle: any = useToggle(isDark);

    const toggleEvent = (e: string) => {
      switch (e) {
        case "dark":
          toggle(true);
          document.documentElement.style.setProperty(
            "--topNavColor",
            "#202023"
          );
          break;
        case "light":
          toggle(false);
          document.documentElement.style.setProperty(
            "--topNavColor",
            "#ec4141"
          );
          break;
      }
      document.documentElement.style.setProperty(
        "--el-color-primary",
        '#ec4141'
      );
      localStorage.removeItem('themeColor')
      localStorage.setItem('themeOffset', '0')
      // 异步获取
      nextTick(() => {
        data.theme = localStorage.getItem('useDarkKEY');
        data.value = 0
        data.color = null
      })
    };

    const setThemeColor = () => {
      let type = localStorage.getItem("useDarkKEY");
      let color = localStorage.getItem("themeColor");
      let offset = localStorage.getItem("themeOffset");

      if (type == "light") {
        if (color) {
          document.documentElement.style.setProperty(
            "--el-color-primary",
            color
          );
          document.documentElement.style.setProperty("--topNavColor", color);
        }
        data.value = parseInt(offset as string);
      }
    };
    setThemeColor();
    // 滑块改变
    const sliderChange = (e: any) => {
      let type = localStorage.getItem("useDarkKEY");
      if (type == "light") {
        // 计算滑块对应的px
        let num: number = isNaN(e)
          ? e.offsetX
          : (document.getElementsByClassName("subjectSliderClass")[0]
              .clientWidth /
              100) *
            e;

        // 获取颜色
        let color = ctx.getImageData(num == 280 ? 277 : num, 5, 1, 1);
        // 拼接rgb颜色
        let rectColor =
          "rgb(" +
          color.data[0] +
          "," +
          color.data[1] +
          "," +
          color.data[2] +
          ")";
        // 记录主题颜色
        data.color = rectColor
        localStorage.setItem("themeColor", rectColor);
        localStorage.setItem("themeOffset", (num / 2.8).toString());
        // 修改颜色
        document.documentElement.style.setProperty(
          "--el-color-primary",
          rectColor
        );
        document.documentElement.style.setProperty("--topNavColor", rectColor);
      }
    };

    watch(
      () => props.popoShow,
      () => {
        if (!ctx) {
          let canvas: any = document.getElementById("sliderCanvas");
          let img = new Image();
          canvas.width = 280;
          canvas.height = 10;
          ctx = canvas.getContext("2d");
          img.src = require("../../assets/images/musicNavBar/slider.png");
          img.onload = function () {
            // 在canvas上画图片
            ctx.drawImage(img, 0, 0, 280, 10);
          };
        }
      }
    );

    return {
      sliderChange,
      toggleEvent,
      toggle,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#toggleSubject {
  .subjectSliderClass {
    height: 8px;
    margin-bottom: 15px;
    .el-slider__runway {
      height: 100%;
      background-image: url("../../assets/images/musicNavBar/slider.png");
      background-size: 100%;
      .el-slider__bar {
        background-color: transparent;
      }
      .el-slider__button-wrapper {
        top: -14.5px;
      }
      .el-slider__button {
        width: 13px;
        height: 13px;
      }
    }
  }
  .subjectTitle {
    color: var(--textColor);
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .subjectContaienr {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .subjectItem {
      text-align: center;
      font-size: 14px;
      color: var(--textColor);
      margin-right: 10px;
      cursor: pointer;
      .subjectContent {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        display: flex;
        position: relative;
        overflow: hidden;
        .logo {
          margin: auto;
          width: 22px;
        }
        .bgImage {
          position: absolute;
          width: 170px;
          top: 50%;
          transform: translateY(-50%);
        }
        .select {
          position: absolute;
          right: 5px;
          bottom: 5px;
          width: 30px;
        }
      }
      .dark {
        background-color: #141414;
      }
      .light {
        background-color: #ec4141;
      }
      .itemTitle {
        margin-top: 2px;
      }
    }
  }
  .box {
    width: 50px;
    height: 50px;
  }
}
</style>