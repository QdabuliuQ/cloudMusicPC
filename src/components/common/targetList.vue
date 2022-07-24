<template>
  <div class="targetList">
    <!-- <img style="width: 18px" v-if="mv" src="~images/recommend/mvIcon.png" alt="">
    <img style="width: 20px" v-if="sq" src="~images/recommend/sq.png" alt=""> -->
    <div
      class="targetIcon originTarget"
      style="margin-right: 8px"
      v-if="mv"
      @click="toMvDetail"
    >
      MV
    </div>
    <div
      class="targetIcon originTarget"
      style="margin-right: 8px"
      v-if="sq"
    >
      SQ
    </div>
    <div
      class="targetIcon originTarget"
      style="margin-right: 8px"
      v-if="origin"
    >
      原唱
    </div>
    <div
      class="targetIcon originTarget"
      style="margin-right: 8px"
      v-if="vip"
    >
      VIP
    </div>
    <!-- <img style="width: 22px; " v-if="vip" src="~images/recommend/vip.png" alt=""> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "targetList",
  props: ["sq", "origin", "mv", "vip"],
  setup(props) {
    const router = useRouter()
    const toMvDetail = () => {
      router.push('/MvPlay?id='+props.mv)
    }
    return {
      toMvDetail
    };
  },
});
</script>

<style lang='less'>
.targetList {
  margin-left: 7px;
  display: flex;
  align-items: center;
  position: relative;
  img {
    margin-right: 4px;
  }
  .targetIcon {
    border: 1px solid @themeColor;
    padding: 3px 10px;
    color: @themeColor;
    font-size: 13px;
    font-weight: bold;
    opacity: 0.6;
    zoom: 0.65;
    border-radius: 5px;
    &:hover {
      opacity: 1;
    }
  }
}
</style>