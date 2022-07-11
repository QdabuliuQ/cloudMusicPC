<template>
  <div @click="itemClick" class="searchSheetItem">
    <div class="index">{{ i + 1 < 10 ? "0" + (i + 1) : i + 1 }}</div>
    <div class="img">
      <el-avatar
        shape="square"
        :size="50"
        :fit="'cover'"
        :src="img"
        style="margin-right: 5px"
      />
      <div class="name">{{ name }}</div>
    </div>
    <div class="creator">by {{ creator }}</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { ElAvatar } from "element-plus";
export default defineComponent({
  props: ["i", "name", "img", "creator"],
  name: "searchSheetItem",
  components: {
    ElAvatar,
  },
  setup(props, content) {
    const itemClick = () => {
      content.emit('itemClick', {
        i: props.i, 
        type: 'playlists',
        name: props.name,
        creator: props.creator,
        img: props.img
      })
    }
    return {
      itemClick
    };
  },
});
</script>

<style lang='less'>
.searchSheetItem {
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
    width: 62%;
    display: flex;
    align-items: center;
    .name {
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .creator {
    text-align: right;
    width: 30%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>