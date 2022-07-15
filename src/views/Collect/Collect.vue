<template>
  <div id="Collect">
    <detailNav @itemClick="itemClick" style="margin-bottom: 30px" :list="navList" :routerKey="'collectIndex'"></detailNav>
    <div class="tip">收藏的{{navList[index].name}}</div>
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import detailNav from "@/components/common/detailNav.vue";
import { InitData } from "@/types/Collect/Collect";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'Collect',
  components: {
    detailNav
  },
  setup() {
    const data = reactive(new InitData())
    const router = useRouter()

    const itemClick = (e: number) => {
      data.index = e
    }

    onMounted(() => {
      data.index = parseInt(router.currentRoute.value.meta.collectIndex as string)
    })
    return {
      ...toRefs(data),
      itemClick,
    }
  }
})
</script>

<style lang='less'>
#Collect {
  padding: 30px;
  .tip {
    font-weight: bold;
    font-size: 17px;
    margin-bottom: 15px;
  }
}
</style>