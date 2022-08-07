<template>
  <div id="NoticeMessage">
    NoticeMessage
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'


export default defineComponent({
  name: 'NoticeMessage',
  setup() {
    const data = reactive({})
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#NoticeMessage {

}
</style>