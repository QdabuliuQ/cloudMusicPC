<template>
  <div id="SingerAlbums">
    <loading v-if="!albumList.length && total != 0"></loading>
    <empty-content v-else-if="total == 0"></empty-content>
    <div
      :infinite-scroll-immediate="false"
      :infinite-scroll-delay="700"
      :infinite-scroll-disabled="disableScroll"
      v-infinite-scroll="loadData"
      v-else
      class="singerAlbumContainer"
    >
      <sheetItem
        v-for="item in albumList"
        :key="item.id"
        :id='item.id'
        :imageUrl="item.blurPicUrl"
        :title="item.name"
        :artist="getName(item.artists)"
        :type="'album'"
      ></sheetItem>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { getSingerAlbums } from "@/network/SingerDetail/singerDetail";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SingerDetail/SingerAlbums";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import sheetItem from "@/components/private/sheetItem.vue";

export default defineComponent({
  name: "SingerAlbums",
  components: {
    emptyContent,
    loading,
    sheetItem,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());
    data.id = router.currentRoute.value.query.id as string;

    const getName = (e: any) => {
      let name = "";
      for (const item of e) {
        name += item.name + "  ";
      }
      return name;
    };
    const loadData = () => {
      getData();
    };
    const getData = () => {
      getSingerAlbums({
        id: data.id,
        limit: 30,
        offset: data.offset * 30,
      }).then((res: any) => {
        if (res.data.hotAlbums.length) {
          data.offset++;
          data.albumList = [...data.albumList, ...res.data.hotAlbums];
        } else {
          data.disableScroll = true;
        }
      });
    };

    getData();

    onMounted(() => {});

    return {
      router,
      getName,
      loadData,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#SingerAlbums {
  .singerAlbumContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
}
</style>