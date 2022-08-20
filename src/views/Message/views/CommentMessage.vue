<template>
  <div id="CommentMessage">
    <loading v-if="!commentList.length && total != 0" />
    <emptyContent v-else-if="total == 0" />
    <div
      v-else
      v-masonry
      transiton-duration="0.3s"
      item-selector=".commentItem2"
      column-width=".commentItem2"
      :gutter="10"
      class="commentContainer"
      v-infinite-scroll="loadData"
      :infinite-scroll-disabled='disableScroll'
      :infinite-scroll-delay='700'
      :infinite-scroll-immediate='false'
    >
      <div
        v-masonry-tile
        class="commentItem2"
        v-for="item in commentList"
        :key="item.time"
      >
        <div style="width: 100%" class="itemContainer">
          <div class="boxContainer">
            <el-avatar :size="30" :src="item.user.avatarUrl" />
            <div class="userInfo">
              <div class="nameInfo">
                <span>{{ item.user.nickname }}</span>
                {{ $getTime(item.time) }}
              </div>
              <div class="contentInfo">{{ item.content }}</div>
              <div class="myCommentInfo">
                {{ item.beRepliedContent }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, getCurrentInstance } from "vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import { InitData } from "@/types/Message/CommentMessage";
import { getCommentMessage } from "@/network/Message/commentMessage";

export default defineComponent({
  name: "CommentMessage",
  components: {
    loading,
    emptyContent,
  },
  setup() {
    const _this: any = getCurrentInstance();
    const data = reactive(new InitData());
    const loadData = () => {
      getData()
    };
    const getData = () => {
      // 获取数据
      getCommentMessage({
        uid: data.uid,
        limit: 30,
        before: data.before,
      }).then((res: any) => {
        data.total == -1 ? (data.total = res.data.total) : "";
        data.commentList = [...data.commentList, ...res.data.comments];
        data.before = res.data.comments[res.data.comments.length - 1].time
        data.disableScroll = !res.data.more
        setTimeout(() => {
          _this.appContext.config.globalProperties.$redrawVueMasonry();
        }, 50);
      });
    };
    getData()

    return {
      loadData,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#CommentMessage {
  .commentContainer {
    width: 100%;
    .commentItem2 {
      width: 24.2%;
      margin-bottom: 12px;
      box-sizing: border-box;
      .boxContainer {
        background: var(--hoverColor);
        padding: 14px 10px;
        border-radius: 8px;
        display: flex;
        position: relative;
        .decoImage {
          position: absolute;
          width: 100%;
          left: 0;
          top: 0;
        }
      }
      .userInfo {
        flex: 1;
        margin-left: 10px;
        .nameInfo {
          margin-top: 5px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: @fontColor;
          span {
            color: var(--nameColor);
          }
        }
        .contentInfo {
          margin-top: 5px;
          font-size: 13px;
          line-height: 20px;
        }
        .myCommentInfo {
          margin-top: 7px;
          padding: 8px 10px 10px;
          background-color: var(--messageColor);
          font-size: 13px;
          line-height: 20px;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>