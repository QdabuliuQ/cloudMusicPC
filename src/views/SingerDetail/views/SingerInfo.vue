<template>
  <loading v-if="desc.ti == ''"></loading>
  <div v-else id="SingerInfo">
    <div class="descInfoItem">
      <div class="infoTitle">{{desc.ti}}</div>
      <div class="infoText">{{desc.txt}}</div>
    </div>
    <div v-for="item,index in descList" :key="index" class="descInfoItem">
      <div class="infoTitle">{{item.ti}}</div>
      <div class="infoText">{{item.txt}}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import { getSingerDesc } from "@/network/SingerDetail/singerDetail";
import { InitData } from "@/types/SingerDetail/SingerInfo";
import { useRouter } from "vue-router";
import loading from "@/components/common/loading.vue";

export default defineComponent({
  name: 'SingerInfo',
  components: {
    loading
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData())
    data.id = router.currentRoute.value.query.id as string;

    getSingerDesc({
      id: data.id
    }).then((res: any) => {
      console.log(res);
      data.desc.ti = '歌手简介'
      data.desc.txt = res.data.briefDesc
      data.descList = res.data.introduction
    })

    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less'>
#SingerInfo{
  .descInfoItem {
    margin-bottom: 25px;
    .infoTitle {
      margin-bottom: 8px;
      font-weight: bold;
      font-size: 16px;
    }
    .infoText {
      text-indent: 2em;
      font-size: 14px;
      line-height: 28px;
      color: @fontColor;
    }
  }
}
</style>