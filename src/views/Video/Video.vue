<template>
  <div id="Video">
    <el-affix :target="'#Video'" :offset="55">
      <div class="topMenuList">
        <div
          @click="toPage(item.path, index)"
          v-for="(item, index) in menuList"
          :key="item.path"
          :class="[activeIndex == index ? 'activeMenuItem' : '', 'menuItem']"
        >
          {{ item.title }}
        </div>
      </div>
    </el-affix>
    <div class="routerContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { InitData } from "@/types/Video/Video";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'Video',
  setup() {
    const data = reactive(new InitData())
    const router = useRouter()
    // 页面跳转
    const toPage = (p: string, i: number) => {
      router.push(p)
      data.activeIndex = i
    }
    onMounted(() => {
      data.activeIndex = router.currentRoute.value.meta.vIndex as number
    })
    return {
      ...toRefs(data),
      toPage
    }
  }
})
</script>

<style lang='less'>
#Video {
  position: relative;
  .topMenuList {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    padding: 15px 30px;
    background-color: var(--bgColor);
    .activeMenuItem {
      position: relative;
      font-weight: bold;
      font-size: 20px;
      &::after {
        position: absolute;
        content: "";
        width: 85%;
        height: 4px;
        background-color: var(--el-color-primary);
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 4px;
      }
    }
    .menuItem {
      color: var(--textColor);
      padding: 10px 0;
      margin-right: 40px;
      cursor: pointer;
    }
  }
  .routerContainer {
    padding: 0 120px 30px;
  }
}
</style>