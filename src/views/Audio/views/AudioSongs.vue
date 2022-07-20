<template>
  <div id="AudioSongs">
    <div ref="toRefBox" class="box" style="width: 100%; height: 1px"></div>
    <loading v-if="!programList.length && count != 0"></loading>
    <emptyContent v-else-if="count == 0"></emptyContent>
    <div v-else class="songsItem" v-for="(item, index) in programList" :key="item.id">
      <div class="itemIndex">
        {{ index + 1 }}
      </div>
      <div class="itemInfo">
        <div
          style="
            margin-right: 8px;
            display: flex;
            align-items: center;
            position: relative;
          "
        >
          <img class="icon" src="~images/common/sheetPlay.png" alt="" />
          <el-avatar
            shape="square"
            :size="60"
            :fit="'cover'"
            :src="item.coverUrl"
          />
        </div>
        {{ item.name }}
      </div>
      <div class="itemPlayCount itemData">
        <img src="~images/common/play.png" alt="" />
        {{ $countFormat(item.listenerCount) }}
      </div>
      <div class="itemLikeCount itemData">
        <img src="~images/common/unpraise.png" alt="" />
        {{ item.likedCount }}
      </div>
      <div class="itemTime itemData">
        {{ $getTime(item.createTime, true) }}
      </div>
      <div class="itemDuration itemData">
        {{ $formatTime(item.duration) }}
      </div>
    </div>
    <div style="margin-top: 20px; display: flex; align-items: center; justify-content: center">
      <el-pagination
        @current-change="pageChange"
        :current-page="offset"
        :page-size="15"
        background
        layout="prev, pager, next"
        :total="count"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";
import { getAudioSongs } from "@/network/Audio/audioSongs";
import { useRouter } from "vue-router";
import { InitData } from "@/types/Audio/AudioSongs";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import useToPoint from "@/hooks/useToPoint";

export default defineComponent({
  name: "AudioSongs",
  components: {
    loading,
    emptyContent
  },
  setup() {
    const toRefBox = ref()
    const data = reactive(new InitData());
    const router = useRouter();

    const pageChange = (e: number) => {
      data.offset = e;
      getData()
      useToPoint(toRefBox.value, -70)
    };
    const getData = () => {
      getAudioSongs({
        rid: router.currentRoute.value.query.audioId as string,
        limit: 15,
        offset: (data.offset - 1) * 15,
      }).then((res: any) => {
        data.programList = res.data.programs;
        data.count = res.data.count;
      });
    };

    onMounted(() => {
      getData()
    });
    return {
      ...toRefs(data),
      pageChange,
      toRefBox,
    };
  },
});
</script>

<style lang='less'>
#AudioSongs {
  .songsItem {
    display: flex;
    align-items: center;
    padding: 10px 0;
    cursor: pointer;
    &:hover {
      background-color: @hoverColor;
    }
    .itemIndex {
      width: 3%;
      text-align: center;
      padding-left: 10px;
      font-size: 13px;
      color: @fontColor;
    }
    .itemInfo {
      display: flex;
      align-items: center;
      width: 57%;
      font-size: 14px;
      .icon {
        position: absolute;
        width: 30px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .itemData {
      width: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: @fontColor;
    }
    .itemPlayCount {
      width: 10%;

      img {
        width: 15px;
        opacity: 0.6;
        margin-right: 7px;
      }
    }
    .itemLikeCount {
      img {
        width: 17px;
        margin-right: 7px;
      }
    }
  }
}
</style>