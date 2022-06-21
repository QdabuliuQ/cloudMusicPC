<template>
  <div id="DiscoverMusic">
    <div class="topMenuList">
      <div @click="toPage(item.path, index)" v-for="(item, index) in menuList" :key="item.path" :class="[activeIndex == index ? 'activeMenuItem' : '', 'menuItem']">
        {{ item.title }}
      </div>
    </div>
    <div class="routerContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/DiscoverMusic";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "DiscoverMusic",
  setup() {
    const data = reactive(new InitData());
    const router = useRouter()
    const toPage = (path: string, i: number) => {
      data.activeIndex = i
      router.push(path)
    }

    onMounted(() => {});
    return {
      ...toRefs(data),
      toPage
    };
  },
});
</script>

<style lang='less'>
#DiscoverMusic {
  padding: 15px 30px;
  .topMenuList {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    .activeMenuItem {
      position: relative;
      font-weight: bold;
      font-size: 20px;
      &::after {
        position: absolute;
        content: '';
        width: 85%;
        height: 4px;
        background-color: @themeColor;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 4px;
      }
    }
    .menuItem {
      color: #Fff;
      padding: 10px 0;
      margin-right: 40px;
      cursor: pointer;
    }
  }
  .routerContainer {
    padding: 0 90px;
  }
}
</style>