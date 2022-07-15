<template>
  <div id="HomePage">
    <div class="centerContainer">
      <div class="leftMenu">
        <el-scrollbar :height="menuListHeight">
          <menusList :menuListHeight="menuListHeight"></menusList>
        </el-scrollbar>
      </div>
      <div :style="{ minHeight: menuListHeight }" class="rightContainer">
        <router-view></router-view>
      </div>
    </div>
    <musicNav></musicNav>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import menusList from "components/common/menusList.vue";
import bus from "vue3-eventbus";
import musicNav from "components/common/musicNav.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    menusList,
    musicNav,
  },
  setup() {
    const data = reactive({
      menuListHeight: "",
    });

    const getWindowInfo = () => {
      data.menuListHeight = window.innerHeight - 55 - 70.2 + "px";
      bus.emit("windowResize");
    };
    const debounce = (fn: any, delay: number) => {
      let timer: any;
      return function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fn();
        }, delay);
      };
    };
    const cancalDebounce = debounce(getWindowInfo, 500);
    onMounted(() => {
      data.menuListHeight =
        document.documentElement.clientHeight - 55 - 70.2 + "px";

      window.addEventListener("resize", cancalDebounce);
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#HomePage {
  .centerContainer {
    margin-top: 55px;
    margin-bottom: 70px;
    display: flex;
    .leftMenu {
      width: 210px;
      position: fixed;
      left: 0;
      z-index: 50;
    }
    .el-scrollbar {
      width: 210px;
    }
    .rightContainer {
      flex: 1;
      margin-left: 210px;
      background-color: @greyColor;
    }
  }
}
</style>