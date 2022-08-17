<template>
  <div id="UserLevel">
    <loading v-if="!info" />
    <div v-else>
      <div class="levelInfo">
        <span class="span2">当前等级：</span>
        <div class="icon">
          <img src="~images/userLevel/level.png" alt="" />
        </div>
        <span class="span1"
          ><em>Lv. {{ info.level }}</em></span
        >
      </div>
      <div class="levelProgress">
        <div v-for="(item, index) in 10" :key="index" class="levelItem">
          <div
            :style="{
              width:
                index < info.level
                  ? '100%'
                  : index == info.level
                  ? info.progress * 100 + '%'
                  : '',
            }"
            :class="[
              index <= info.level ? 'levelActive' : '',
              'levelContainer',
            ]"
          ></div>
          <span
            :class="[info.level == index ? 'activeTarget' : '', 'targetItem']"
          >
            {{ index }}
          </span>
          <span
            v-if="index == 9"
            :class="[info.level == 10 ? 'activeTarget' : '', 'lastItem']"
          >
            10
          </span>
        </div>
      </div>
      <div class="levelPower">
        <span> 当前等级权限 </span>
        <div class="powerItem" v-for="(item, index) in info.info" :key="index">
          {{ item }}
        </div>
      </div>
      <div class="levelDetail">
        <span class="detailTitle">距离下一个等级：<em>Lv. {{info.level + 1}}</em></span>
        <div class="progressItem">
          <div class="itemTitle">听歌:</div>
          <div class="itemProgress">
            <el-progress :color='"#ec4141"' :percentage="100 / info.nextPlayCount * info.nowPlayCount">
              <span>已经听了{{info.nowPlayCount}}首，还需要听歌{{info.nextPlayCount - info.nowPlayCount}}首</span>
            </el-progress>
          </div>
        </div>
        <div class="progressItem">
          <div class="itemTitle">登录:</div>
          <div class="itemProgress">
            <el-progress :color='"#ec4141"' :percentage="100 / info.nextLoginCount * info.nowLoginCount">
              <span>已经登录{{info.nowLoginCount}}天，还需要登录{{info.nextLoginCount - info.nowLoginCount}}天</span>
            </el-progress>
          </div>
        </div>
      </div>
      <div class="powerList">
        <span class="listTitle">等级特权</span>
        <div class="tableList">
          <div v-for="item in levelPowerList" :key="item.level" class="tableItem">
            <div class="level"><em>Lv. {{item.level}}</em></div>
            <div class="power">
              <span v-for="p,i in item.power" :key="i">{{p}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { getLevelInfo } from "@/network/UserInfo/UserLevel";
import { InitData } from "@/types/UserInfo/UserLevel";
import loading from "@/components/common/loading.vue";
export default defineComponent({
  name: "UserLevel",
  components: {
    loading
  },
  setup() {
    const data = reactive(new InitData());
    getLevelInfo().then((res: any) => {
      data.info = res.data.data;
      data.info.info = data.info.info.split("$");
      console.log(data.info);
    });

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#UserLevel {
  padding: 30px;
  .icon {
    position: relative;
    &::before {
      z-index: 1;
      position: absolute;
      content: "";
      width: 25px;
      aspect-ratio: 1/1;
      background-color: var(--bgColor);
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
    }
    img {
      width: 40px;
      position: relative;
      z-index: 2;
      display: block;
    }
  }
  .levelInfo {
    display: flex;
    align-items: center;
    color: var(--textColor);
    .span1 {
      margin-left: 5px;
      font-size: 25px;
      color: @themeColor;
      font-weight: bold;
    }
    .span2 {
      font-size: 23px;
      font-weight: bold;
    }
  }
  .progressTarget {
    width: 86%;
  }
  .levelProgress {
    height: 10px;
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    border-radius: 10px;
    margin-top: 50px;
    .levelActive {
      background-color: @themeColor !important;
    }
    .levelItem {
      height: 100%;
      background-color: var(--borderColor);
      position: relative;
      .levelContainer {
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
      }
      .activeTarget {
        color: var(--textColor) !important;
        background-color: @themeColor;
        border-radius: 50%;
      }
      span {
        padding: 3px 8px;
        color: @fontColor;
      }
      .targetItem {
        position: absolute;
        top: -35px;
        left: -15px;
      }
      &:not(:last-child) {
        margin-right: 3px;
      }
    }
    .lastItem {
      position: absolute;
      right: -15px;
      top: -35px !important;
    }
  }
  .levelPower {
    margin-top: 30px;
    span {
      font-size: 20px;
      font-weight: bold;
      color: var(--textColor);
    }
    .powerItem {
      margin-top: 10px;
      font-size: 14px;
      color: @fontColor;
      padding-left: 20px;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        width: 6px;
        height: 6px;
        background-color: @themeColor;
        border-radius: 50%;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .levelDetail {
    margin-top: 30px;
    .detailTitle {
      font-weight: bold;
      font-size: 20px;
      color: var(--textColor);
      em {
        color: @themeColor;
      }
    }
    .progressItem {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .itemTitle {
        margin-right: 10px;
        font-size: 13px;
        color: #979797;
      }
      .itemProgress {
        .el-progress-bar {
          width: 220px;
          
        }
        .el-progress__text {
            font-size: 12px !important;
          }
      }
    }
  }
  .powerList {
    margin-top: 30px;
    .listTitle {
      font-weight: bold;
      font-size: 20px;
      color: var(--textColor);
    }
    .tableList {
      .tableItem {
        display: flex;
        align-items: center;
        padding: 15px 0;
        &:not(:last-child) {
          box-sizing: border-box;
          border-bottom: 1px solid var(--borderColor);
        }
        .level {
          width: 80px;
          color: @themeColor;
          font-weight: bold;
          font-size: 18px;
        }
        .power {
          span {
            margin-right: 15px;
            color: @fontColor;
          }
        }
      }
    }
  }
}
</style>