<template>
  <div @click="itemClick" class="searchAudioItem">
    <div class="index">
      {{ i + 1 < 10 ? "0" + (i + 1) : i + 1 }}
    </div>
    <div class="info">
      <el-avatar
        style="margin-right: 7px"
        shape="square"
        :size="50"
        :fit="'cover'"
        :src="img"
      />
      <div class="name">
        <span>{{ category }}</span
        >{{ name }}
      </div>
    </div>
    <div class="count">
      <img src="../../assets/images/recommend/playLine.png" alt="" />
      {{ format(playCount) }}
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { ElAvatar } from "element-plus";

export default defineComponent({
  name: "searchAudioItem",
  props: ["i", "img", "name", "playCount", "category"],
  components: {
    ElAvatar,
  },
  setup(props, content) {
    const format = (num: string | number) => {
      num = Number(num);
      if (Math.abs(num) > 100000000) {
        return (num / 100000000).toFixed(2) + "亿";
      } else if (Math.abs(num) > 10000) {
        return (num / 10000).toFixed(2) + "万";
      } else {
        return num;
      }
    };
    
    const itemClick = () => {
      let n = format(props.playCount)
      content.emit('itemClick', {
        i: props.i, 
        type: 'djradio',
        name: props.name,
        img: props.img,
        playCount: n
      })
    }

    return {
      format,
      itemClick
    };
  },
});
</script>

<style lang='less'>
.searchAudioItem {
  padding: 5px 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: @hoverColor;
  }
  .index {
    width: 8%;
  }
  .info {
    width: 70%;
    display: flex;
    align-items: center;
    .name {
      width: 190px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span {
        display: inline-block;
        padding: 5px 10px;
        font-size: 12px;
        color: @themeColor;
        border: 1px solid @themeColor;
        transform: scale(0.7);
      }
    }
  }
  .count {
    display: flex;
    width: 22%;
    align-items: center;
    justify-content: flex-end;
    img {
      width: 12px;
      height: 12px;
      margin-right: 3px;
      opacity: 0.7;
    }
  }
}
</style>