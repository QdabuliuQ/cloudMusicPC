<template>
  <div class="bottomProgressContainer">
    <div class="progressContainer">
      <div class="leftMusicInfo">
        <div class="musicInfo">
          <div class="musicImage">
            <img v-if="musicInfo.id" :src="musicInfo.al.picUrl" alt="">
            <img v-else src="~images/shareDialog/musicEvent.png" alt="">
          </div>
          <div class="musicDetail">
            <div class="musicName">{{musicInfo.id ? musicInfo.name : '歌曲名称'}}</div>
            <div class="musicUser">{{musicInfo.id ? musicInfo.ar[0].name : '创作者'}}</div>
          </div>
        </div>
      </div>
      <div class="centerMusicPro">
        <div class="progressBox">
          <div class="topBtnList">
            <div class="btnContainer">
              <img style="width: 25px" src="~images/common/last.png" alt="" />
            </div>
            <div class="btnContainer">
              <img
                v-if="!isPlay"
                @click="toPlayMusic(true)"
                style="width: 30px"
                src="~images/common/play.png"
                alt=""
              />
              <img
                v-else
                @click="toStopMusic(false)"
                style="width: 30px"
                src="~images/common/stop.png"
                alt=""
              />
            </div>
            <div class="btnContainer">
              <img style="width: 25px" src="~images/common/next.png" alt="" />
            </div>
          </div>
          <div class="bottomProgress">
            <el-slider
              height="5px"
              size="small"
              input-size="small"
              v-model="musicProgress"
              :show-tooltip="false"
            />
          </div>
        </div>
      </div>
      <div class="rightMusicSetting">
        <el-tooltip
          class="box-item"
          effect="dark"
          placement="top"
          :show-tooltip="false"
        >
          <img src="~images/common/shout.png" alt="" />
          <template #content>
            <el-slider v-model="volume" vertical height="100px" />
          </template>
        </el-tooltip>
        <img
          style="width: 20px; height: 20px"
          src="~images/common/list.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import bus from "vue3-eventbus";

export default defineComponent({
  name: "",
  setup() {
    const data = reactive({
      isPlay: false,
      musicProgress: 0,
      volume: 0,
      musicInfo: <any>{}
    });
    const methods = {
      toPlayMusic(e: boolean) {
        data.isPlay = e;
      },

      toStopMusic(e: boolean) {
        data.isPlay = e;
      },
    };
    
    bus.on('playMusic', (e: any) => {
      console.log(e);
      data.musicInfo = e
    })

    return {
      ...toRefs(data),
      ...methods,
    };
  },
});
</script>

<style lang='less'>
.el-popper {
  padding: 10px 12px !important;
  .el-slider__runway {
    height: 4px;
    background-color: #363639;
    margin: 0 7px !important;
  }
  .el-slider__bar {
    height: 4px;
    background-color: @themeColor;
  }
  .el-slider__button {
    height: 12px;
    width: 12px;
    border: solid 2px @themeColor;
  }
}
.bottomProgressContainer {
  height: 70px;
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: @color;
  box-sizing: border-box;
  border-top: 2px solid #4c4c4c;
  .progressContainer {
    padding: 8px 30px;
    display: flex;
    align-items: center;
    .leftMusicInfo {
      flex: 2;

      .musicInfo {
        display: flex;
        align-items: center;
      }
      .musicImage {
        width: 50px;
        height: 50px;
        border-radius: 6px;
        object-fit: contain;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .musicDetail {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
        .musicName {
          max-width: 200px;
          min-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .musicUser {
          font-size: 12px;
          margin-top: 3px;
        }
      }
    }
    .centerMusicPro {
      flex: 6;
      display: flex;
      align-items: center;
      justify-content: center;
      .progressBox {
        .topBtnList {
          margin-top: 3px;
          height: 30px;
          justify-content: space-evenly;
          display: flex;
          align-items: center;
        }
        .btnContainer {
          height: 100%;
          margin: 0 20px;
          display: flex;
          align-items: center;
          img {
            cursor: pointer;
          }
        }
        .bottomProgress {
          width: 350px;
          .el-slider {
            height: 20px;
          }
          .el-slider__runway {
            height: 4px;
            background-color: #363639;
          }
          .el-slider__bar {
            height: 4px;
            background-color: @themeColor;
          }
          .el-slider__button {
            height: 12px;
            width: 12px;
            border: solid 2px @themeColor;
          }
        }
      }
    }
    .rightMusicSetting {
      flex: 2;
      display: flex;
      justify-content: flex-end;
      img {
        width: 23px;
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>