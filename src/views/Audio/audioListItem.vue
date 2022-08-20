<template>
  <div class="audioListItem">
    <div class="audioItem">
      <div v-if="rank" class="rank">
        <div class="rankIndex">
          {{ rank }}
        </div>
        <div class="rankIcon">
          <img v-if="rank < lastRank" src="~images/mvList/up.png" alt="" />
          <img v-else-if="rank > lastRank" src="~images/mvList/down.png" alt="" />
          <div class="rankChar" v-else>-</div>
        </div>
      </div>
      <div class="image">
        <el-avatar shape="square" :size="45" :fit="'cover'" :src="picUrl" />
      </div>
      <div class="info">
        <div class="name">
          {{ name }}
        </div>
        <div class="writer">{{ copywriter }}</div>
      </div>
      <div v-if="category" class="category">
        <span>{{ category }}</span>
      </div>
      <div v-if="score" class="score">
        <img src="~images/mvList/fire.png" alt="">
        {{score}}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";

export default defineComponent({
  name: "audioListItem",
  props: ["picUrl", "name", "copywriter", "category", "lastRank", "rank", "score"],
  setup() {
    const data = reactive({});
    onMounted(() => {});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.audioListItem {
  width: 100%;
  .audioItem {
    display: flex;
    align-items: center;
    font-size: 13px;
    padding: 7px 15px;
    cursor: pointer;
    &:nth-child(even) {
      background-color: #363636;
    }
    .rank {
      width: 7%;
      text-align: center;
      .rankChar {
        font-size: 18px;
        font-weight: bold;
        color: @fontColor;
      }
    }
    .image {
      width: 12%;
    }
    .info {
      width: 68%;
      .writer {
        color: @fontColor;
        font-size: 12px;
        margin-top: 4px;
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name {
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--textColor);
      }
    }
    .category {
      width: 20%;
      text-align: right;
      span {
        display: inline-block;
        transform: scale(0.8);
        font-size: 12px;
        padding: 7px 14px;
        color: var(--el-color-primary);
        border: 1px solid var(--el-color-primary);
        border-radius: 8px;
      }
    }
    .score {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-weight: bold;
      color: var(--el-color-primary);
      img {
        width: 15px;
        margin-right: 4px;
      }
    }
  }
}
</style>