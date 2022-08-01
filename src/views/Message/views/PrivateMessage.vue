<template>
  <div id="PrivateMessage">
    PrivateMessage
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
export default defineComponent({
  name: 'PrivateMessage',
  setup() {
    const data = reactive({})
    onMounted(() => {
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
</style>