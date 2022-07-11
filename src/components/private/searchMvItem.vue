<template>
  <div @click="itemClick" class="searchMvItem">
    <div class="index">{{ i + 1 < 10 ? "0" + (i + 1) : i + 1 }}</div>
    <div class="img">
      <div class="imgBox">
        <img :src="img" alt="" />
      </div>
      <div class="overTwoLine">
        {{ name }}
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

export default defineComponent({
  props: ["i", "img", "name", "playCount"],
  name: "searchMvItem",
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
        type: 'mv',
        name: props.name,
        playCount: n,
        img: props.img
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
.searchMvItem {
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
  .img {
    width: 70%;
    display: flex;
    align-items: center;
    .imgBox {
      width: 100px;
      min-width: 100px;
      height: 55px;
      margin-right: 5px;
      border-radius: 7px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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