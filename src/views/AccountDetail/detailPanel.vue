<template>
  <div id="detailPanel">
    <div v-if="img" class="leftImage">
      <el-avatar :fill='"cover"' :size='200' :src="img" />
    </div>
    <slot name="img" />
    <div class="rightInfo">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";

export default defineComponent({
  name: "detailPanel",
  props: ["img"],
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
#detailPanel {
  width: 100%;
  display: flex;
  .leftImage {
    margin-right: 20px;
  }
  .rightInfo {
    flex: 1;
  }
}
</style>