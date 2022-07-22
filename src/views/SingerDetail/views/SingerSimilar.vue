<template>
  <div id="SingerSimilar">
    <loading v-if="!singerList.length"></loading>
    <div class="singerSimilarContainer">
      <div
        @click="router.push('/SingerDetail?id=' + item.id)"
        class="singerSimilarItem"
        v-for="item in singerList"
        :key="item.id"
      >
        <div class="singerImage">
          <el-image
            style="width: 100%; height: 100%"
            :src="item.img1v1Url"
            :fit="'contain'"
          />
        </div>
        <div class="singerName">
          {{ item.name }}
          <span v-for="(i, index) in item.alias" :key="index"
            >({{ i }})&nbsp;&nbsp;</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { InitData } from "@/types/SingerDetail/SingerSimilar";
import { getSingerSimilar } from "@/network/SingerDetail/singerDetail";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SingerSimilar",
  components: {
    emptyContent,
    loading,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());
    data.id = router.currentRoute.value.query.id as string;

    const getData = () => {
      getSingerSimilar({
        id: data.id,
      }).then((res: any) => {
        data.singerList = res.data.artists;
      });
    };
    getData();

    return {
      router,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#SingerSimilar {
  .singerSimilarContainer {
    display: inline-flex;
    flex-flow: row wrap;
    align-content: flex-start;
    .singerSimilarItem {
      width: 18.5%;
      margin-left: 1%;
      margin-bottom: 20px;
      cursor: pointer;
      .singerImage {
        aspect-ratio: 1/1;
        border-radius: 8px;
        overflow: hidden;
      }
      .singerName {
        font-size: 14px;
        margin-top: 3px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          color: @fontColor;
        }
      }
    }
  }
}
</style>