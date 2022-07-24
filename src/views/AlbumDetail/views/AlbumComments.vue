<template>
  <div id="AlbumComments">
    <commentArea @commentEvent="commentEvent"></commentArea>
    <loading v-if="!commentList.length && total != 0"></loading>
    <empty-content v-else-if="total == 0"></empty-content>
    <div class="albumCommentContainer">
      <div v-if="hotCommentList.length" class="title">热门评论</div>
      <commentItem
        v-for="item in hotCommentList"
        :key="item.commentId"
        :avatarUrl="item.user.avatarUrl"
        :time="item.time"
        :likedCount="item.likedCount"
        :content="item.content"
        :nickname="item.user.nickname"
        :userId="item.user.userId"
        :beReplied="item.beReplied"
        :liked="item.liked"
        :id="id"
        :cid="item.commentId"
        :type="3"
      ></commentItem>
      <div
        v-if="commentList.length"
        ref="newCommentTitle"
        style="margin-top: 40px"
        class="title"
      >
        最新评论({{ commentList.length }})
      </div>
      <commentItem
        v-for="item in commentList"
        :key="item.commentId"
        :avatarUrl="item.user.avatarUrl"
        :time="item.time"
        :likedCount="item.likedCount"
        :content="item.content"
        :nickname="item.user.nickname"
        :userId="item.user.userId"
        :beReplied="item.beReplied ? item.beReplied : item.beRepliedUser"
        :liked="item.liked"
        :id="id"
        :cid="item.commentId"
        :type="3"
      ></commentItem>
      <div
        style="
          margin-top: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <el-pagination
          @current-change="pageChange"
          :current-page="offset"
          :page-size="30"
          background
          layout="prev, pager, next"
          :total="total"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref } from "vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import commentArea from "@/components/common/commentArea.vue";
import commentItem from "@/components/private/commentItem.vue";
import { useRouter } from "vue-router";
import { InitData } from "@/types/AlbumDetail/AlbumComments";
import { getAlbumComment } from "@/network/AlbumDetail/albumDetail";
import { commentResource } from "@/network/UserInfo/userEvents";
import useToPoint from "@/hooks/useToPoint";

export default defineComponent({
  name: "AlbumComments",
  components: {
    loading,
    emptyContent,
    commentArea,
    commentItem,
  },
  setup() {
    const newCommentTitle = ref();
    const router = useRouter();
    const data = reactive(new InitData());
    data.id = router.currentRoute.value.query.id as string;

    // 发布评论
    const commentEvent = (e: {content: string, cid: number}) => {
      if (e.cid) {
        commentResource({
          t: 2,
          type: 3,
          id: parseInt(data.id),
          content: e.content,
          commentId: e.cid
        }).then((res: any) => {
          if (res.data.code == 200) {
            setTimeout(() => {
              getData();
            }, 300);
          }
        });
      } else {
        commentResource({
          t: 1,
          type: 3,
          id: parseInt(data.id),
          content: e.content,
        }).then((res: any) => {
          if (res.data.code == 200) {
            res.data.comment.likedCount = 0;
            data.commentList.unshift(res.data.comment);
          }
        });
      }
    };
    // 切换页数
    const pageChange = (e: number) => {
      data.offset = e;
      useToPoint(newCommentTitle.value, -15);
      getData();
    };
    // 获取数据
    const getData = (type?: string) => {
      getAlbumComment({
        id: data.id,
        limit: 30,
        offset: (data.offset - 1) * 30,
      }).then((res: any) => {
        if (data.total == -1) {
          data.total = res.data.total;
        }
        if (type == "all") {
          data.hotCommentList = res.data.hotComments;
        }
        data.commentList = res.data.comments;
      });
    };
    getData("all");

    return {
      newCommentTitle,
      commentEvent,
      pageChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#AlbumComments {
  .title {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>