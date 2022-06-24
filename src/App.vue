<template>
  <router-view style="margin-bottom: 70px" />
  <musicNav></musicNav>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import musicNav from "components/common/musicNav.vue"
export default defineComponent({
  name: 'App',
  components: {
    musicNav
  },
  setup() {
    const data = reactive({
      
    })
    onMounted(() => {
    })
    return {
      ...toRefs(data),
      
    }
  }
})
</script>

<style lang="less">
@import (css) "./assets/less/elementStyle.less";
html,
body {
  margin: 0;
  padding: 0;
  color: #fff;
}
</style>
