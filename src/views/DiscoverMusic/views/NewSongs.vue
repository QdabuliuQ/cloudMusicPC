<template>
  <div id="NewSongs">
    <div class="toggleContainer">
      <div class="toggleContent">
        <div :class="[activeIdex == index ? 'activeItem' : '', 'btnItem']" v-for="item,index in navList" @click="toggleItem(index)" :key="item.name">{{item.name}}</div>
      </div>
    </div>
    <div class="musicContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { InitData } from "@/types/NewSongs"
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'NewSongs',
  setup() {
    const data = reactive(new InitData())
    const router = useRouter()
    const toggleItem = (e: number) => {
      data.activeIdex = e
      if (e == 0) {
        router.push('/NewMusicList')
      } else {
        router.push('/NewDisc')
      }
    }

    onMounted(() => {
      data.activeIdex = router.currentRoute.value.meta.yIndex as number ;
    })

    return {
      ...toRefs(data),
      toggleItem
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