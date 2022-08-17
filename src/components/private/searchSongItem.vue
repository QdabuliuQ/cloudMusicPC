<template>
  <div @click="itemClick" class="searchSongItem">
    <div class="index">{{ i + 1 < 10 ? "0" + (i + 1) : i + 1 }}</div>
    <div class="name">{{ name }}</div>
    <div class="singer">
      <span v-for="item in singer">{{ item.name }}&nbsp;&nbsp;</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "searchSongItem",
  props: ["i", "name", "singer"],
  setup(props, content) {
    const itemClick = () => {
      content.emit('itemClick', {
        i: props.i, 
        type: 'song',
        name: props.name,
        singer: props.singer
      })
    }

    return {
      itemClick
    };
  },
});
</script>

<style lang='less'>
.searchSongItem {
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 5px 10px;
  text-align: left;
  cursor: pointer;
  &:hover {
    background-color: var(--hoverColor);
  }
  .index {
    width: 8%;
  }
  .name {
    width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .singer {
    width: 42%;
    color: @fontColor;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>