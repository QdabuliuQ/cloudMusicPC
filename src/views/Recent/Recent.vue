<template>
  <div id="Recent">
    <div class="title">最近播放<span>（共100条）</span></div>
    <detailNav style="margin-bottom: 18px" :list="navList" :routerKey="'recentIndex'"></detailNav>
  </div>
  <router-view style="padding-bottom: 50px"></router-view>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import detailNav from "@/components/common/detailNav.vue";
import { InitData } from "@/types/Recent/Recent";

export default defineComponent({
  name: 'Recent',
  components: {
    detailNav
  },
  setup() {
    const data = reactive(new InitData())
    onMounted(() => {
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#Recent {
  padding: 30px 30px 0;
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    color: var(--textColor);
    span {
      font-size: 14px;
      color: @fontColor;
    }
  }
}
</style>