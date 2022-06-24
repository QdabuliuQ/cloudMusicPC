<template>
  <div class="videoItem">
    <div :style="{height: itemHeight}" class="videoImage">
      <div class="mask"></div>
      <div v-if="playCount" class="playCount">
        <img src="~images/recommend/playLine.png" alt="">
        {{$countFormat(playCount)}}
      </div>
      <img v-if="topLeftIcon" class="icon" src="~images/common/sheetPlay.png" alt="" />
      <img class="image" :src="imageUrl" alt="" />
    </div>
    <div class="videoTitle">
      {{ title }}
    </div>
    <div v-if="artists" class="videoArtists">
      <span v-for="(item, index) in artists" :key="item.id"
        ><label v-if="index != artists.length && index != 0"> / </label
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, withDefaults, defineProps } from "vue";

export default defineComponent({
  props: {
    imageUrl: String,
    title: String,
    topLeftIcon: Boolean,
    artists: Object,
    playCount: Number,
    itemHeight: String
  },
  name: "videoItem",
  setup() {
    return {};
  },
});
</script>

<style lang='less'>
.videoItem {
  width: 100%;
  cursor: pointer;
  .videoImage {
    width: 100%;
    // height: 8.5vw;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    .mask {
      z-index: 5;
      position: absolute;
      width: 100%;
      height: 40px;
      background-image: linear-gradient(rgba(0, 0, 0, 0.491), transparent);
    }
    .playCount {
      position: relative;
      z-index: 6;
      display: flex;
      align-items: center;
      position: absolute;
      color: #fff;
      right: 8px;
      top: 6px;
      font-size: 12px;
      text-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
      img {
        width: 13px;
        margin-right: 5px;
      }
    }
    .icon {
      position: absolute;
      top: 8px;
      left: 8px;
      width: 30px;
    }
    .image {
      width: 100%;
      border-radius: 8px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .videoTitle {
    margin-top: 2px;
    color: #fff;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    font-size: 14px;
  }
  .videoArtists {
    font-size: 12px;
    margin-top: 4px;
    color: rgb(155, 155, 155);
    display: flex;
    align-items: center;
    span {
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>