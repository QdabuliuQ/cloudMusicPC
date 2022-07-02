<template>
  <div id="SheetComment">
    <div class="commentBox">
      <textarea></textarea>
    </div>
    <div class="btnContainer">
      <div class="sendBtn">评论</div>
    </div>
    <div class="commentContainer">
      <div class="title">热门评论</div>
      <loading v-if="!hotCommentList.length"></loading>
      <commentItem
        v-else
        v-for="item in hotCommentList"
        :key="item.commentId"
        :avatarUrl="item.user.avatarUrl"
        :time="item.time"
        :likedCount="item.likedCount"
        :content="item.content"
        :nickname="item.user.nickname"
        :userId="item.user.userId"
        :beReplied="item.beReplied"
      ></commentItem>
      <div ref="newCommentTitle" style="margin-top: 40px" class="title">最新评论({{total}})</div>
      <loading v-if="!commentList.length"></loading>
      <commentItem
        v-else
        v-for="item in commentList"
        :key="item.commentId"
        :avatarUrl="item.user.avatarUrl"
        :time="item.time"
        :likedCount="item.likedCount"
        :content="item.content"
        :nickname="item.user.nickname"
        :userId="item.user.userId"
        :beReplied="item.beReplied"
      ></commentItem>
      <div style="margin-top: 15px;display:flex;align-items:center;justify-content:center">
        <el-pagination @current-change="pageChange" :current-page="offset" :page-size="30" background layout="prev, pager, next" :total="total" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs, ref } from "vue";
import commentItem from "@/components/private/commentItem.vue";
import { getSheetComment } from "@/network/SheetDetail/SheetDetail";
import { useRouter } from "vue-router";
import { InitData } from "@/types/SheetDetail/SheetComment";
import useToPoint from "@/hooks/useToPoint";
import loading from "@/components/common/loading.vue";

export default defineComponent({
  name: "SheetComment",
  components: {
    commentItem,
    loading,
  },
  setup() {
    const data = reactive(new InitData());
    const router = useRouter();
    const newCommentTitle = ref()

    const pageChange = (e: number) => {
      data.offset = e
      useToPoint(newCommentTitle.value, -15)
      getData()
    }

    const getData = (type?: string) => {
      getSheetComment({
        id: router.currentRoute.value.query.id as string,
        limit: 30,
        offset: (data.offset-1) * 30,
      }).then((res: any) => {
        if (type == 'all') {
          data.total = res.data.total
          data.hotCommentList = res.data.hotComments;
        }
        data.commentList = res.data.comments
      });
    }

    onMounted(() => {
      getData('all')
    });
    return {
      ...toRefs(data),
      pageChange,
      newCommentTitle,
    };
  },
});
</script>

<style lang='less'>
#SheetComment {
  padding: 0 30px 30px;
  .commentBox {
    padding: 10px 12px;
    border-radius: 8px;
    background-color: #393939;
    margin-bottom: 8px;
    textarea {
      resize: none;
      width: 100%;
      height: 80px;
      background-color: transparent;
      outline: none;
      border: 0;
      color: #fff;
      font-size: 15px;
    }
  }
  .btnContainer {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 40px;
    .sendBtn {
      font-size: 13px;
      padding: 10px 24px;
      background-color: #393939;
      border-radius: 10px;
      transition: 0.2s all linear;
      cursor: pointer;
      &:hover {
        background-color: @themeColor;
        color: #fff;
      }
    }
  }
  .commentContainer {
    .title {
      font-weight: bold;
    }
  }
}
</style>