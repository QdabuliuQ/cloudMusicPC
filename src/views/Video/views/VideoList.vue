<template>
  <div id="VideoList">
    <div v-if="cateList.length" class="cateBtnContainer">
      <el-popover
        ref="popoverRef"
        :effect="'dark'"
        placement="bottom-start"
        :width="650"
        trigger="click"
      >
        <template #reference>
          <div class="cateBtn">
            {{ cateList[activeCate].name }}
            <img src="~images/common/moreDetail.png" alt="" />
          </div>
        </template>
        <el-scrollbar height="370px">
          <div class="cateList">
            <div
              @click="toggleItem(index)"
              :class="[activeCate == index ? 'activeCateItem' : '', 'cateItem']"
              v-for="(item, index) in cateList"
              :key="item.id"
            >
              {{ item.name }}
            </div>
          </div>
        </el-scrollbar>
      </el-popover>
    </div>
    <loading v-if="!videoList.length"></loading>
    <div
      v-else
      :infinite-scroll-disabled="disableScroll"
      :infinite-scroll-immediate="false"
      :infinite-scroll-delay="700"
      v-infinite-scroll="loadVideoData"
      class="videoContainer"
    >
      <videoItem
        v-for="item in videoList"
        :key="item.data.vid"
        :imageUrl="item.data.coverUrl"
        :playCount="item.data.playTime"
        :title="item.data.title"
        :creator="item.data.creator ? item.data.creator.nickname : null"
        :itemHeight="'10vw'"
        :duration="item.data.durationms"
      ></videoItem>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  ref,
  getCurrentInstance,
} from "vue";
import { getVideoCate, getVideoList } from "@/network/Video/videoList";
import { InitData } from "@/types/Video/VideoList";
import videoItem from "@/components/private/videoItem.vue";
import loading from "@/components/common/loading.vue"

export default defineComponent({
  name: "VideoList",
  components: {
    videoItem,
    loading,
  },
  setup() {
    const { ctx } = getCurrentInstance() as any;
    const data = reactive(new InitData());
    const popoverRef = ref(null);
    // 切换类型
    const toggleItem = (e: number) => {
      data.activeCate = e;
      data.offset = 0
      ctx.$refs.popoverRef.hide();  // 关闭popover
      data.videoList = []
      data.disableScroll = false
      getVideoData();
    };
    // 获取视频数据
    const getVideoData = () => {
      getVideoList({
        id: data.cateList[data.activeCate].id,
        offset: data.offset ,
      }).then((res: any) => {
        data.offset += 2
        if (res.data.datas.length) {
          data.videoList = [...data.videoList, ...res.data.datas];
        } else {
          data.disableScroll = true;
        }
      });
    };
    // 滚动加载更多
    const loadVideoData = () => {
      getVideoData();
      // getVideoData();
    };
    onMounted(() => {
      getVideoCate().then((res) => {
        data.cateList = res.data.data;
        getVideoData();
        setTimeout(() => {
          getVideoData();
        }, 300);
      });
    });
    return {
      ...toRefs(data),
      toggleItem,
      popoverRef,
      loadVideoData,
    };
  },
});
</script>

<style lang='less'>
.el-popover {
  padding: 20px !important;
  background: rgb(72, 72, 72) !important;
  .cateList {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    font-size: 13px;
    text-align: center;
    .activeCateItem {
      background-color: #ec414127;
      color: @themeColor;
    }
    .cateItem {
      margin-bottom: 5px;
      cursor: pointer;
      border-radius: 30px;
      padding: 7px 0;
      &:hover {
        background-color: #ec414127;
        color: @themeColor;
      }
    }
  }
}
.el-popper.is-dark .el-popper__arrow::before {
  background: rgb(72, 72, 72) !important;
}
#VideoList {
  .cateBtnContainer {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .cateBtn {
      padding: 8px 30px 10px;
      border-radius: 36px;
      font-size: 13px;
      cursor: pointer;
      border: 1px solid rgb(112, 112, 112);
      display: flex;
      align-items: center;
      img {
        width: 12px;
        margin-left: 2px;
        position: relative;
        top: 1px;
      }
      &:hover {
        background-color: rgb(76, 76, 76);
      }
    }
  }
  .videoContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
  }
}
</style>