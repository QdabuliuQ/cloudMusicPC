<template>
  <div class="videoItemPrivate">
    <div class="leftInfo">
      <div class="count">
        <img src="~images/recommend/playLine.png" alt="">
        {{$countFormat(playTime)}}
      </div>
      <div class="duration">
        {{$formatTime(durationms)}}
      </div>
      <img :src="coverUrl" alt="" />
    </div>
    <div class="rightInfo">
      <div>
        <div class="overTwoLine infoName">
          {{title}}
        </div>
        <div class="infoCreator">
          by <span v-for="item in creator">
            {{item.userName}}&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
export default defineComponent({
  name: "videoItem",
  props: ["coverUrl", "durationms", "title", "vid", "creator", "userId", "playTime"],
  setup() {
    const data = reactive({});
    onMounted(() => {});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.videoItemPrivate {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .leftInfo {
    width: 55%;
    height: 6.5vw;
    display: flex;
    align-items: center;
    position: relative;
    
    .count {
      position: absolute;
      font-size: 12px;
      top: 4px;
      right: 6px;
      display: flex;
      align-items: center;
      img {
        width: 12px;
        margin-right: 4px;
      }
    }
    .duration {
      position: absolute;
      font-size: 12px;
      bottom: 4px;
      right: 6px;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      cursor: pointer;
      object-fit: cover;
    }
  }
  .rightInfo {
    font-size: 12px;
    width: 43%;
    display: flex;
    align-items: center;
    .infoCreator {
      margin-top: 8px;
      color: @fontColor;
      span {
        cursor: pointer;
        &:hover {
          color: #Fff;
        }
      }
    }
  }
}
</style>