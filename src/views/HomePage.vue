<template>
  <div id="HomePage">
    <musicNavBar></musicNavBar>
    <div class="centerContainer">
      <el-scrollbar :height="menuListHeight">
        <menusList :menuListHeight='menuListHeight'></menusList>
      </el-scrollbar>
      <div :style="{minHeight: menuListHeight}" class="rightContainer">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import musicNavBar from "components/common/musicNavBar.vue";
import menusList from "components/common/menusList.vue";
import bus from 'vue3-eventbus'

export default defineComponent({
  name: "HomePage",
  components: {
    musicNavBar,
    menusList,
  },
  setup() {
    const data = reactive({
      menuListHeight: ''
    });
    
    const getWindowInfo = () => {
      data.menuListHeight = window.innerHeight - 55 - 70.2 + 'px'
      bus.emit('windowResize')
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
      data.menuListHeight = document.documentElement.clientHeight - 55 - 70.2 + 'px'
      
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
    display: flex;
    .el-scrollbar {
      width: 210px;
    }
  }
  .rightContainer {
    width: calc(100vw - 210px);
    background-color: @greyColor;
  }
}
</style>