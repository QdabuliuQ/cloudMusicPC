<template>
  <div id="detailNav">
    <div
      v-if="list && list.length"
      v-for="(item, index) in list"
      :key="index"
      :class="[activeIndex==index?'activeItem':'','navItem']"
      v-html="item.name"
      @click="itemToggle(index)"
    >
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: ["list", "routerKey"],
  name: "detailNav",
  setup(props) {
    const data = reactive({
      activeIndex: 0
    });
    const router = useRouter()

    const itemToggle = (e: number) => {
      data.activeIndex = e
      router.push(props.list[e].path)
    }
    onMounted(() => {
      data.activeIndex = router.currentRoute.value.meta[props.routerKey] as number
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
    color: #fff !important;
    position: relative;
    span {
      font-weight: bold !important;
      font-size: 18px !important;
      color: #fff !important;
    }
    &::after {
      position: absolute;
      content: '';
      width: 80%;
      bottom: -5px;
      left: 50%;
      border-radius: 4px;
      transform: translateX(-50%);
      height: 4px;
      background-color: @themeColor;
    }
  }
  .navItem {
    color: #c2c2c2;
    margin-right: 30px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>