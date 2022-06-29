<template>
  <div class="pageNav">
    <img @click="toBack" v-if="icon" src="~images/common/back.png" alt="">
    {{title}}
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'pageNav',
  props: ['title', 'icon'],
  setup() {
    const router = useRouter()
    const toBack = () => {
      router.back()
    }
    return {
      toBack
    }
  }
})
</script>

<style lang='less'>
.pageNav {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 17px;
  color: @fontColor;
  font-weight: bold;
  margin-bottom: 15px;
  img {
    width: 17px;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>