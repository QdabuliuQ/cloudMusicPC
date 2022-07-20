<template>
  <div @click="toPage" class="sheetItem">
    <!--  :style="{ height: imgHeight }" -->
    <div class="sheetImage">
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
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: ["imageUrl", "title", "sum", "artist", "artId", "type", "id"],
  name: "sheetItem",
  setup(props) {
    const router = useRouter()
    const toPage = () => {
      if (props.type == 'sheet') {
        router.push('/SheetDetail?id='+props.id)
      }
    }

    return {
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
    &:hover {
      color: #fff;
    }
  }
}
</style>