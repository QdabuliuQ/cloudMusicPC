<template>
  <div :style="{width: width+'px'}" class="eventPics">
    <div v-if="pics && pics.length" :style="{width: width+'px', gridTemplateColumns: grid}" class="picContainer">
      <el-avatar @click="$preview(item.originUrl)" :style="{width: imgWidth, height: imgWidth}" v-for="item,index in pics" shape="square" :size="100" :fit="'cover'" :src="item.pcSquareUrl" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'eventPics',
  props: ['pics'],
  setup(props) {
    const data = reactive({
      width: 0,
      grid: '',
      imgWidth: '',
    })
    
    watch(()=>props.pics, (n) => {
      if (n) {
        if (n.length == 1) {
          data.width = 200
          data.imgWidth = '200px'
          data.grid = '1fr'
        } else if (n.length == 2) {
          data.width = 300
          data.imgWidth = (300 - 10) / 2 + 'px'
          data.grid = '1fr 1fr'
        } else {
          data.width = 400
          data.imgWidth = (400 - 20) / 3 + 'px'
          data.grid = '1fr 1fr 1fr'
        }
        console.log(data.width);
        
      }
    }, {immediate: true})

    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
.eventPics {
  width: 100%;
  .picContainer {
    display: grid;
    grid-gap: 10px;
    .el-avatar {
      cursor: pointer;
    }
  }
}
</style>