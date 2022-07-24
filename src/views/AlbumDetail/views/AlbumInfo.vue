<template>
  <div id="AlbumInfo">
    <div class="infoTitle">专辑介绍</div>
    <div class="infoDesc">
      {{ desc }}
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { getAlbumDetail } from "@/network/AlbumDetail/albumDetail";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AlbumInfo",
  setup() {
    const router = useRouter();
    const data = reactive({
      desc: "",
      id: "",
    });
    data.id = router.currentRoute.value.query.id as string;
    getAlbumDetail({
      id: data.id,
    }).then((res: any) => {
      data.desc = res.data.album.description;
    });

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#AlbumInfo {
  .infoTitle {
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 16px;
  }
  .infoDesc {
    text-indent: 2em;
    font-size: 14px;
    line-height: 28px;
    color: @fontColor;
  }
}
</style>