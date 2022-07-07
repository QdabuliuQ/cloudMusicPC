<template>
  <div :style="{padding: isLoading ? '80px 0 115px' : '87px 0'}" class="loading">
    <div
      v-if="isLoading"
      class="loadingContainer"
      element-loading-text="加载中"
      element-loading-background="#292929"
      v-loading="isLoading"
    ></div>
    <div class="loadFail" v-else>
      加载失败
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "loading",
  setup() {
    const data = reactive({
      isLoading: true,
    });

    setTimeout(() => {
      data.isLoading = false
    }, 5000);
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.loading {
  width: 100%;
  margin: 10px 0;
  border-radius: 16px;
  overflow: hidden;
  background-color: #292929;
  .el-loading-mask {
    z-index: 1;
    .el-loading-spinner .path {
      stroke: @themeColor;
    }
    .el-loading-text {
      color: @themeColor;
    }
  }
  .loadFail {
    text-align: center;
    color: rgb(108, 108, 108);
  }
}
</style>