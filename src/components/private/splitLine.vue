<template>
  <div @click="toPage" class="splitLine">
    <span>{{title}}</span>
    <img v-if="icon" src="~images/common/moreDetail.png" alt="">
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: ['title', 'icon', 'path'],
  name: 'splitLine',
  
  setup(props) {
    const router = useRouter()
    const toPage = () => {
      router.push(props.path)
    }
    return {
      toPage
    }
  }
})
</script>

<style lang='less'>
.splitLine {
  font-size: 18px;
  font-weight: bold;
  color: var(--textColor);
  display: flex;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 10px;
  cursor: pointer;
  img {
    width: 16px;
    margin-left: 5px;
  }
}
</style>