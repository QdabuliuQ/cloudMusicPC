<template>
  <div class="videoItem">
    <div :style="{ height: itemHeight }" class="videoImage">
      <div class="mask"></div>
      <div v-if="playCount" class="playCount">
        <img src="~images/recommend/playLine.png" alt="" />
        {{ $countFormat(playCount) }}
      </div>
      <img
        v-if="topLeftIcon"
        class="icon"
        src="~images/common/sheetPlay.png"
        alt=""
      />
      <img v-if="centerIcon" class="centerIcon" src="~images/common/sheetPlay.png" alt="">
      <div v-if="duration" class="duration">
        {{$formatTime(duration)}}
      </div>
      <img id="coverImage" style="height: 100%;" class="image" :src="imageUrl" alt="" />
    </div>
    <div class="videoTitle">
      {{ title }}
    </div>
    <div v-if="artists" class="videoArtists">
      <!-- <label v-if="index != artists.length && index != 0"> / </label
        > -->
      <span v-for="(item, index) in artists" :key="item.id"
        >{{ item.name }}&nbsp;&nbsp;&nbsp;&nbsp;</span
      >
    </div>
    <div class="videoCreator" v-if="creator">
      {{creator}}
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    imageUrl: String,
    title: String,
    topLeftIcon: Boolean,
    artists: Object,
    playCount: Number,
    itemHeight: String,
    creator: String,
    artId: String,
    duration: Number,
    centerIcon: Boolean
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
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    background-color: #3e3e3e;
    &:hover {
      .centerIcon {
        opacity: 1;
      }
    }
    #coverImage {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .duration {
      z-index: 5;
      position: absolute;
      font-size: 12px;
      color: #Fff;
      right: 10px;
      bottom: 8px;
    }
    .mask {
      z-index: 5;
      position: absolute;
      top: 0;
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
      z-index: 5;
    }
    .centerIcon {
      position: absolute;
      width: 60px;
      opacity: 0;
      transition: 0.2s opacity linear;
      top: 50%;
      left: 50%;
      width: 50px;
      z-index: 5;
      transform: translate(-50%, -50%);
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
    margin-top: 4px;
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
  .videoCreator {
    font-size: 12px;
    margin-top: 4px;
    color: rgb(155, 155, 155);
    cursor: pointer;
      &:hover {
        color: #fff;
      }
  }
}
</style>