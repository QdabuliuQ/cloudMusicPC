<template>
  <div @click="toPage" class="sheetItem">
    <!--  :style="{ height: imgHeight }" -->
    <div v-if="recommend" class="sheetImage recommendSheet">
      <img class="bgImage" src="~images/recommend/bgImage.png" alt="">
      <div class="maskBox">
        <img class="calIcon" src="~images/recommend/calendar.png" alt="">
        <span>{{day}}</span>
      </div>
    </div>
    <div v-else class="sheetImage">
      <div class="mask"></div>
      <div v-if="sum" class="count">
        <img src="~images/recommend/playLine.png" alt="" />
        {{ $countFormat(sum) }}
      </div>
      <img class="icon" src="~images/common/sheetPlay.png" alt="" />
      <el-avatar
        style="height: 100%"
        shape="square"
        :fit="'cover'"
        :src="imageUrl"
      />
    </div>
    
    <div class="sheetTitle">
      {{ title }}
    </div>
    <div v-if="artist" class="sheetArt">
      {{ artist }}
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: ["imageUrl", "title", "sum", "artist", "artId", "type", "id", "recommend"],
  name: "sheetItem",
  setup(props) {
    const router = useRouter()
    const toPage = () => {
      if (props.type == 'sheet') {
        router.push({
          path: '/SheetDetail',
          query: {
            id: props.id
          },
          name: 'SheetDetail'
        })
      } else if (props.type == 'album') {
        router.push('/AlbumDetail?id='+props.id)
      }
    }
    let day = ref<any>(0)
    day = new Date().getDate() as number

    return {
      day,
      toPage
    };
  },
});
</script>

<style lang='less'>
.sheetItem {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 5px;
  &:hover .icon {
    opacity: 1 !important;
  }
  .recommendSheet {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    .maskBox {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.518);
      .calIcon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120px;
      }
      span {
        position: absolute;
        top: 58%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-size: 35px;
      }
    }
    .bgImage {
      filter: blur(13px);
      position: absolute;
      width: 150%;
      height: 150%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .sheetImage {
    width: 100%;
    aspect-ratio: 1/1;
    position: relative;
    .el-avatar {
      width: 100% !important;
      height: 11vw;
    }
    .el-avatar--square {
      border-radius: 10px;
    }
    .mask {
      position: absolute;
      width: 100%;
      height: 40px;
      background-image: linear-gradient(rgba(0, 0, 0, 0.491), transparent);
    }
    .count {
      display: flex;
      align-items: center;
      position: absolute;
      top: 6px;
      right: 8px;
      color: #fff;
      font-size: 12px;
      img {
        width: 13px;
        margin-right: 5px;
      }
    }
    .icon {
      position: absolute;
      width: 32px;
      right: 6px;
      bottom: 8px;
      opacity: 0;
      transition: 0.2s all linear;
    }
    img {
      width: 100%;
      border-radius: 8px;
    }
  }
  .sheetTitle {
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
  .sheetArt {
    font-size: 12px;
    color: @fontColor;
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      color: #fff;
    }
  }
}
</style>