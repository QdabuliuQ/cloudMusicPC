<template>
  <div id="NewSongs">
    <div class="toggleContainer">
      <div class="toggleContent">
        <div :class="[activeIdex == index ? 'activeItem' : '', 'btnItem']" v-for="item,index in navList" :key="item.name">{{item.name}}</div>
      </div>
    </div>
    
    <div class="musicContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { InitData } from "@/types/NewSongs"

export default defineComponent({
  name: 'NewSongs',
  setup() {
    const data = reactive(new InitData())
    onMounted(() => {
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#NewSongs {
  .toggleContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    .toggleContent {
      display: flex;
      align-items: center;
      border-radius: 30px;
      border: 1px solid #5e5e5e;
      .activeItem {
        background-color: #5e5e5e;
        color: #Fff !important;
      }
      .btnItem {
        padding: 7px 30px;
        color: @fontColor;
        font-size: 13px;
        cursor: pointer;
        border-radius: 30px;
        &:hover:not(.activeItem) {
          background-color: #3e3e3e;
        }
      }
    }
  }
  
}
</style>