<template>
  <div
    :style="{ maxHeight: menuListHeight, height: menuListHeight }"
    id="menusList"
  >
    <div class="listContainer">
      <div class="menuList">
        <div
          @click="toPage(item.path, index)"
          v-for="(item, index) in menuList"
          :key="item.path"
          :class="[activeIndex == index ? 'activeItem' : '', 'menuItem']"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, watch } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: ["menuListHeight"], // 声明所接收的数据
  name: "menusList",
  setup(props) {
    const router = useRouter();

    watch(
      () => props.menuListHeight,
      (newProps) => {
        // 监听props
        data.menuListHeight = newProps;
      }
    );

    const data = reactive({
      menuListHeight: "",
      activeIndex: 0,
      menuList: [
        { title: "发现音乐", path: "/DiscoverMusic" },
        { title: "视频", path: "/Video" },
        { title: "关注", path: "/Follow" },
        { title: "私人FM", path: "/PrivateFM" },
      ],

      toPage(path: string, index: number) {
        router.push(path);
        data.activeIndex = index;
      },
    });
    onMounted(() => {
      data.activeIndex = router.currentRoute.value.meta.index as number ;
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#menusList {
  width: 210px;
  background-color: @greyColor;
  min-height: 100%;
  position: fixed;
  left: 0;
  box-sizing: border-box;
  border-right: 2px solid #4c4c4c;
  .listContainer {
    padding: 15px 0;
    .activeItem {
      font-weight: bold;
      background-color: #ffffff1c;
    }
    .menuItem {
      padding: 10px 18px;
      color: #fff;
      cursor: pointer;
      font-size: 15px;
      margin-bottom: 3px;
      transition: 0.2s all linear;
      &:hover {
        background-color: #ffffff1c;
      }
    }
  }
}
</style>