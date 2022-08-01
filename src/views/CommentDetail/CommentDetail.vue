<template>
  <div id="CommentDetail">
    <commentItem
      v-if="ownComment.commentId"
      :avatarUrl="ownComment.user.avatarUrl"
      :nickname="ownComment.user.nickname"
      :userId="ownComment.user.userId"
      :time="ownComment.time"
      :content="ownComment.content"
      :liked="ownComment.liked"
      :likedCount="ownComment.likedCount"
      :disOperation="true"
      style="border-bottom: 1px solid rgb(85 85 85)"
    ></commentItem>
    <loading v-if="!commentList.length && total != 0"></loading>
    <emptyContent v-else-if="total == 0"></emptyContent>
    <div
      v-else
      :infinite-scroll-immediate="false"
      :infinite-scroll-delay="700"
      :infinite-scroll-disabled="disableScroll"
      v-infinite-scroll="loadData"
      class="replyContainer"
    >
      <div class="title">
        共
        <span>{{ total }}</span>
        条回复
      </div>
      <div class="commentBox">
        <div class="left"></div>
        <div class="right">
          <commentItem
            v-for="item in commentList"
            :key="item.commentId"
            :avatarUrl="item.user.avatarUrl"
            :nickname="item.user.nickname"
            :userId="item.user.userId"
            :time="item.time"
            :content="item.content"
            :liked="item.liked"
            :likedCount="item.likedCount"
            :disOperation="true"
          ></commentItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import { getCommentDetail } from "@/network/CommentDetail/commentDetail";
import { InitData } from "@/types/CommentDetail/CommentDetail";
import commentItem from "@/components/private/commentItem.vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";

export default defineComponent({
  name: "CommentDetail",
  components: {
    commentItem,
    loading,
    emptyContent,
  },
  setup() {
    const router = useRouter();
    const data = reactive(new InitData());
    let res: any = router.currentRoute.value.query;
    data.cid = res.cid;
    data.id = res.id;
    data.type = res.type;

    // 滚动加载
    const loadData = () => {
      getData();
    };

    // 获取数据
    const getData = (type?: string) => {
      getCommentDetail({
        parentCommentId: data.cid as string,
        id: data.id as string,
        type: data.type,
        limit: 30,
        time: data.time,
      }).then((res: any) => {
        if (type == "all") {
          data.total = res.data.data.totalCount;
          data.ownComment = res.data.data.ownerComment;
        }
        data.disableScroll = !res.data.data.hasMore
        data.time = res.data.data.time;
        data.commentList = [...data.commentList, ...res.data.data.comments];
      });
    };

    getData("all");

    onMounted(() => {});
    return {
      ...toRefs(data),
      loadData,
    };
  },
});
</script>

<style lang='less'>
#CommentDetail {
  padding: 30px;
  .replyContainer {
    padding: 15px 0;
    .title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 5px;
      span {
        color: @themeColor;
      }
    }
    .commentBox {
      display: flex;
      .left {
        width: 40px;
      }
      .right {
        flex: 1;
      }
    }
  }
}
</style>