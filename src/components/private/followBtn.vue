<template>
  <div v-if="isFollow" class="followBtn">
    <img src="~images/common/follow.png" alt="" />
    <span> 已关注 </span>
  </div>
  <div v-else class="unFollowBtn">
    <img src="~images/common/unfollow.png" alt="" />
    <span> 关注 </span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
export default defineComponent({
  props: ["isFollow"],
  name: "followBtn",
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
.followBtn {
  padding: 7px 15px;
  font-size: 12px;
  color: @fontColor;
  background-color: var(--chlidCommentBgc);
  border-radius: 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 12px;
    margin-right: 5px;
  }
  span {
    position: relative;
    top: -0.5px;
  }
}
.unFollowBtn {
  padding: 7px 18px;
  font-size: 12px;
  color: var(--textColor);
  background-color: @themeColor;
  border-radius: 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 12px;
    margin-right: 5px;
  }
  span {
    position: relative;
    top: -0.5px;
  }
}
</style>