<template>
  <div id="SheetComment">
    <commentArea @commentEvent="commentEvent"></commentArea>
    <div class="commentContainer">
      <loading v-if="commentList.length == 0 && total != 0"></loading>
      <div v-else>
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
          :type="2"
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
          :type="2"
        ></commentItem>
      </div>
      <emptyContent v-if="total == 0"></emptyContent>
      <div
        v-if="total"
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
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";
import commentItem from "@/components/private/commentItem.vue";
import { getSheetComment } from "@/network/SheetDetail/sheetDetail";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SheetDetail/SheetComment";
import useToPoint from "@/hooks/useToPoint";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import commentArea from "@/components/common/commentArea.vue";
import { commentResource } from "@/network/UserInfo/userEvents";

export default defineComponent({
  name: "SheetComment",
  components: {
    commentItem,
    loading,
    emptyContent,
    commentArea,
  },
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();
    const newCommentTitle = ref();

    data.id = router.currentRoute.value.query.id as string;

    const commentEvent = (e: {content: string, cid: number}) => {
      if (e.cid) {
        commentResource({
          t: 2,
          type: 2,
          id: parseInt(router.currentRoute.value.query.id as string),
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
          type: 2,
          id: parseInt(router.currentRoute.value.query.id as string),
          content: e.content,
        }).then((res: any) => {
          if (res.data.code == 200) {
            res.data.comment.likedCount = 0;
            data.commentList.unshift(res.data.comment);
          }
        });
      }
    };

    const pageChange = (e: number) => {
      data.offset = e;
      useToPoint(newCommentTitle.value, -15);
      getData();
    };

    const getData = (type?: string) => {
      getSheetComment({
        id: router.currentRoute.value.query.id as string,
        limit: 30,
        offset: (data.offset - 1) * 30,
      }).then((res: any) => {
        if (type == "all") {
          data.total = res.data.total;
          data.hotCommentList = res.data.hotComments;
        }
        data.commentList = res.data.comments;
      });
    };

    onMounted(() => {
      getData("all");
    });
    return {
      ...toRefs(data),
      pageChange,
      commentEvent,
      newCommentTitle,
    };
  },
});
</script>

<style lang='less'>
#SheetComment {
  padding: 0 30px 30px;
  .title {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    color: var(--textColor);
  }
}
</style>