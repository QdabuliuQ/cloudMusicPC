<template>
  <div class="newMusicItem">
    <div class="leftImage">
      <img class="icon" src="~images/common/sheetPlay.png" alt="" />
      <img class="image" :src="imageUrl" alt="" />
    </div>
    <div class="rightInfo">
      <div class="musicInfo">
        <div class="musicName">{{ musicName }}</div>
        <div class="musicSinger">
          <img v-if="mvid" class="mvIcon" src="~images/recommend/mvIcon.png" alt="">
          <span v-for="item,index in musicSinger" :key="item.id"><label v-if="index != musicSinger.length && index != 0"> / </label>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    imageUrl: String,
    musicName: String,
    musicSinger: Object,
    mvid: Number,
  },
  name: "newMusicItem",
  setup() {
  },
});
</script>

<style lang='less'>
.newMusicItem {
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 8px;
  &:hover {
    background-color: #ffffff1b;
  }
  .leftImage {
    width: 55px;
    height: 55px;
    position: relative;
    cursor: pointer;
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 25px;
      opacity: 0.8;
    }
    .image {
      width: 100%;
      border-radius: 8px;
    }
  }
  .rightInfo {
    display: flex;
    align-items: center;
    .musicInfo {
      padding-left: 10px;
      font-size: 13px;
      color: #fff;
      .musicSinger {
        font-size: 12px;
        margin-top: 4px;
        color: rgb(155, 155, 155);
        display: flex;
        align-items: center;
        .mvIcon {
          width: 20px;
          margin-right: 8px;
          opacity: 0.6;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
        span {
          cursor: pointer;
          &:hover {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>