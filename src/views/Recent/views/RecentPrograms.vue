<template>
  <div id="RecentPrograms">
    <loading v-if="programList.length == 0 && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <div v-else class="programContainer">
      <div
        v-for="item in programList"
        :key="item.resourceId"
        class="programItem"
      >
        <div class="imgContainer">
          <el-image
            style="width: 100%; height: 100%"
            :src="item.data.pubDJProgramData.coverUrl"
            :fit="'contain'"
          />
        </div>

        <div class="info">
          <div class="name overTwoLine">
            {{ item.data.pubDJProgramData.name }}
          </div>
          <div class="detail">
            <div>
              <img
                style="width: 12px; margin-right: 3px"
                src="~images/recommend/playLine.png"
                alt=""
              />{{ $formatTime(item.data.pubDJProgramData.duration) }}
            </div>
            <div>
              累计播放{{
                $countFormat(item.data.pubDJProgramData.listenerCount)
              }}次
            </div>
          </div>
          <div v-if="item.data.commentCount" class="comment">
            评论：{{ item.data.commentCount }}条
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { InitData } from "@/types/Recent/RecentPrograms";
import { getRecentPrograms } from "@/network/Recent/recent";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";

export default defineComponent({
  name: "RecentPrograms",
  components: {
    loading,
    emptyContent,
  },
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      getRecentPrograms().then((res: any) => {
        console.log(res);
        data.programList = res.data.data.list;
        data.total = res.data.data.total;
      });
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#RecentPrograms {
  padding: 0 40px;
  .programContainer {
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
      .imgContainer {
        width: 80px;
        height: 80px;
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
          margin-top: 3px;
          display: flex;
          align-items: center;
          div {
            display: flex;
            align-items: center;
            font-size: 12px;
            margin-right: 10px;
            color: @fontColor;
          }
        }
        .comment {
          font-size: 12px;
          color: @fontColor;
        }
      }
    }
  }
}
</style>