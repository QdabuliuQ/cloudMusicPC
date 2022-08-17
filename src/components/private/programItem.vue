<template>
  <div class="programItem">
    <div class="leftImage">
      <img class="icon" src="~images/common/sheetPlay.png" alt="">
      <img class="image" :src="coverUrl" alt="">
    </div>
    <div class="rightInfo">
      <div class="infoContainer">
        <div class="infoName">{{name}} by {{dj.nickname}}</div>
        <div class="infoChannels">
          <span v-for="item in channels">
            {{item}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
export default defineComponent({
  name: 'programItem',
  props: {
    coverUrl: String,
    name: String,
    channels: Object,
    id: Number,
    dj: Object,
  },
  setup() {
    const data = reactive({})
    onMounted(() => {
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.programItem {
  width: 100%;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #ffffff1b;
  }
  .leftImage {
    width: 80px;
    min-width: 80px;
    height: 80px;
    position: relative;
    margin-right: 10px;
    .icon {
      position: absolute;
      width: 25px;
      bottom: 5px;
      right: 5px;
      z-index: 5;
    }
    .image {
      border-radius: 8px;
      width: 100%;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .rightInfo {
    display: flex;
    align-items: center;
    .infoContainer {
      color: var(--textColor);
      .infoName {
        font-size: 14px;
        margin-bottom: 5px;
      }
      .infoChannels {
        color: #9b9b9b;
        span {
          margin-right: 8px;
          font-size: 12px;
          cursor: pointer;
          &:hover {
            color: var(--textColor);
          }
        }
      }
    }
   }
}
</style>