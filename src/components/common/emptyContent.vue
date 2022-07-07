<template>
  <div class="emptyContent">
    <el-empty :image-size="200" :description="'暂无相关数据'" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
export default defineComponent({
  name: "emptyContent",
  setup() {
    const data = reactive({});
    onMounted(() => {});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.el-empty {
  --el-empty-fill-color-0: var(--el-color-black);
  --el-empty-fill-color-1: #4b4b52;
  --el-empty-fill-color-2: #36383d;
  --el-empty-fill-color-3: #3d3d3d;
  --el-empty-fill-color-4: #262629;
  --el-empty-fill-color-5: #202124;
  --el-empty-fill-color-6: #212224;
  --el-empty-fill-color-7: #1b1c1f;
  --el-empty-fill-color-8: #1c1d1f;
  --el-empty-fill-color-9: #18181a;
}
.emptyContent {
  padding: 30px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  .el-empty__description p{
  font-size: 17px !important;

  }
}
</style>