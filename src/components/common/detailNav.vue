<template>
  <div id="detailNav">
    <div
      v-if="list && list.length"
      v-for="(item, index) in list"
      :key="index"
      :class="[activeIndex == index ? 'activeItem' : '', 'navItem']"
      v-html="item.name"
      @click="itemToggle(index)"
    ></div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, watch } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: ["list", "routerKey", "watch"],
  name: "detailNav",
  setup(props, content) {
    const data = reactive({
      activeIndex: 0,
    });
    const router = useRouter();

    const itemToggle = (e: number) => {
      data.activeIndex = e;
      router.replace(props.list[e].path);
      content.emit("itemClick", e);
    };

    watch(
      () => router.currentRoute.value.name,
      (n) => {
        if (props.watch) {
          data.activeIndex = router.currentRoute.value.meta[
            props.routerKey
          ] as number;
        }
      }
    );
    onMounted(() => {
      data.activeIndex = router.currentRoute.value.meta[
        props.routerKey
      ] as number;
    });
    return {
      ...toRefs(data),
      itemToggle,
    };
  },
});
</script>

<style lang='less'>
#detailNav {
  width: 100%;
  display: flex;
  align-items: flex-end;
  .activeItem {
    font-weight: bold;
    font-size: 17px !important;
    color: var(--textColor) !important;
    position: relative;
    span {
      font-weight: bold !important;
      font-size: 18px !important;
      color: var(--textColor) !important;
    }
    &::after {
      position: absolute;
      content: "";
      width: 80%;
      bottom: -5px;
      left: 50%;
      border-radius: 4px;
      transform: translateX(-50%);
      height: 4px;
      background-color: var(--el-color-primary);
    }
  }
  .navItem {
    color: var(--textColor);
    margin-right: 30px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>