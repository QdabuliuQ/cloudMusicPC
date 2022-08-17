<template>
  <div @click="itemClick" class="shareProgramItem">
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
        {{ name }}
      </div>
    </div>
    <div class="count">
      <img src="../../assets/images/common/unpraise.png" alt="" />
      {{ likedCount }}
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { ElAvatar } from "element-plus";

export default defineComponent({
  name: 'searchProgramItem',
  props: ["i", "img", "name", "likedCount"],
  components: {
    ElAvatar,
  },
  setup(props, content) {
    const itemClick = () => {
      content.emit('itemClick', {
        i: props.i, 
        type: 'djprogram',
        name: props.name,
        img: props.img,
        likedCount: props.likedCount
      })
    }

    return {
      itemClick
    }
  }
})
</script>

<style lang='less'>
.shareProgramItem {
  padding: 5px 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: var(--hoverColor);
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