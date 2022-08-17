<template>
  <div id="RecentAudios">
    <loading v-if="audioList.length == 0 && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <div v-else class="audioContainer">
      <div
        @click="toPage(`/AudioDetail?audioId=${item.data.id}`)"
        v-for="item in audioList"
        :key="item.resourceId"
        class="programItem"
      >
        <el-image
          style="width: 80px; height: 80px"
          :src="item.data.picUrl"
          :fit="'contain'"
        />
        <div class="info">
          <div class="name overTwoLine">
            {{ item.data.name }}
          </div>
          <div class="detail">
            by&nbsp;&nbsp;<span>
              {{item.data.dj.nickname}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/Recent/RecentAudios";
import { getRecentAudios } from "@/network/Recent/recent";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RecentAudios",
  components: {
    loading,
    emptyContent,
  },
  setup() {
    const data = reactive(new InitData());
    const router = useRouter()

    const toPage = (p: string) => {
      router.push(p)
    }
    onMounted(() => {
      getRecentAudios().then((res: any) => {
        data.audioList = res.data.data.list
        data.total = res.data.data.total;
      });
    });
    return {
      ...toRefs(data),
      toPage,
    };
  },
});
</script>

<style lang='less'>
#RecentAudios {
  padding: 0 40px;
  .audioContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
    .programItem {
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: var(--hoverColor);
      }
      .el-image__placeholder {
        background-color: #4a4a4a !important;
      }
      .info {
        margin-left: 7px;
        width: 200px;
        .name {
          font-size: 14px;
          font-weight: bold;
          color: var(--textColor);
        }
        .detail {
          margin-top: 12px;
          display: flex;
          align-items: center;
          font-size: 13px;
          color: @fontColor;
          span {
            cursor: pointer;
            &:hover {
              color: var(--textColor);
            }
          }
        }
      }
    }
  }
}
</style>