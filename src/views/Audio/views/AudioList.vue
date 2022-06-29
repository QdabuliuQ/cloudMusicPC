<template>
  <div id="AudioList">
    <div class="pageTitle">
      {{ title }}
    </div>
    <loading v-if="!audioList.length"></loading>
    <div
      v-else
      :infinite-scroll-disabled="disableScroll"
      :infinite-scroll-immediate="false"
      :infinite-scroll-delay="700"
      v-infinite-scroll="loadMoreData"
      class="audioContainer"
    >
      <div v-for="audio in audioList" :key="audio.id" class="audioItem">
        <div class="image">
          <el-avatar
            shape="square"
            :size="80"
            :fit="'cover'"
            :src="audio.picUrl"
          />
        </div>
        <div class="info">
          <div class="name">{{ audio.name }}</div>
          <div class="text">{{ audio.dj.nickname }}</div>
          <div :title="audio.desc" class="desc overTwoLine">{{ audio.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/Audio/AudioList";
import { getAudioCataData } from "@/network/Audio/audioList";
import { useRouter } from "vue-router";
import loading from "@/components/common/loading.vue";

export default defineComponent({
  name: "AudioList",
  components: {
    loading
  },
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();

    // 获取数据
    const getData = () => {
      getAudioCataData({
        limit: 30,
        offset: data.offset * 30,
        cateId: data.cateId,
      }).then((res: any) => {
        if (res.data.djRadios.length) {
          data.offset++;
          data.audioList = [...data.audioList, ...res.data.djRadios];
        } else {
          data.disableScroll = true;
        }
      });
    };

    const loadMoreData = () => {
      getData();
    };

    onMounted(() => {
      data.cateId = router.currentRoute.value.query.cateId;
      data.title = router.currentRoute.value.query.name as string;
      getData();
    });
    return {
      ...toRefs(data),
      loadMoreData,
    };
  },
});
</script>

<style lang='less'>
#AudioList {
  padding: 30px 120px;
  .pageTitle {
    margin-bottom: 20px;
    font-weight: bold;
    color: @fontColor;
    font-size: 22px;
  }
  .audioContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 25px;
    .audioItem {
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 8px;
      margin-bottom: 10px;
      &:hover {
        background: @hoverColor;
      }
      .image {
        display: flex;
        align-items: center;
      }
      .info {
        margin-left: 15px;
        .name {
          font-size: 13.5px;
        }
        .text {
          margin: 5px 0;
          font-size: 12.5px;
          color: @fontColor;
          &:hover {
            color: #fff;
          }
        }
        .desc {
          font-size: 12px;
          color: @fontColor;
        }
      }
    }
  }
}
</style>