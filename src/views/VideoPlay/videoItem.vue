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
          by <span @click.stop="creatorClick(item.userId?item.userId:item.id)" v-for="item in creator">
            {{item.userName?item.userName:item.name}}&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "videoItem",
  emits: ['creatorClick'],
  props: ["coverUrl", "durationms", "title", "vid", "creator", "userId", "playTime"],
  setup(props, context) {
    const creatorClick = (e: number) => {
      context.emit('creatorClick', e)
    }
    return {
      creatorClick
    }
  },
});
</script>

<style lang='less'>
.videoItemPrivate {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
  .leftInfo {
    width: 55%;
    aspect-ratio: 2/1.1;
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
          color: var(--textColor);
        }
      }
    }
  }
}
</style>