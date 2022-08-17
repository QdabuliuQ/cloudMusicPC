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