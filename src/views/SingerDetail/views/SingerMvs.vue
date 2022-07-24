<template>
  <div id="SingerMvs">
    <empty-content v-if="!mvList.length"></empty-content>
    <div
      :infinite-scroll-disabled="disableScroll"
      :infinite-scroll-delay="700"
      :infinite-scroll-immediate="false"
      v-infinite-scroll="loadData"
      class="singerMvContainer"
    >
      <videoItem
        v-for="item in mvList"
        :key="item.id"
        :id='item.id'
        :type='"mv"'
        :imageUrl="item.imgurl16v9"
        :title="item.name"
        :playCount="item.playCount"
        :duration="item.duration"
        :ratio="'2/1.1'"
        :centerIcon="true"
      ></videoItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SingerDetail/SingerMvs";
import useToPoint from "@/hooks/useToPoint";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import videoItem from "@/components/private/videoItem.vue";
import { getSingerMv } from "@/network/SingerDetail/singerDetail";

export default defineComponent({
  name: "SingerMvs",
  components: {
    emptyContent,
    loading,
    videoItem,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());
    data.id = router.currentRoute.value.query.id as string;

    const loadData = () => {
      getData();
    };
    const getData = () => {
      getSingerMv({
        id: data.id,
        limit: 30,
        offset: data.offset * 30,
      }).then((res: any) => {
        if (res.data.mvs.length) {
          data.offset++;
          data.mvList = [...data.mvList, ...res.data.mvs];
        } else {
          data.disableScroll = true;
        }
      });
    };
    getData();

    return {
      loadData,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#SingerMvs {
  .singerMvContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
  }
}
</style>