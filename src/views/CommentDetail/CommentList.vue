<template>
  <div id="CommentList">
    <loading v-if="!info"></loading>
    <div v-else class="topContainer">
      <div class="leftImage">
        <el-avatar
          shape="square"
          :size="70"
          :fit="'contain'"
          :src="info.al.picUrl"
        />
      </div>
      <div class="rightInfo">
        <div class="infoTitle">
          {{ info.name }}
        </div>
        <div class="infoOther">
          <div class="otherItem">
            专辑：<span @click="router.push('/AlbumDetail?id=' + info.al.id)">{{
              info.al.name
            }}</span>
          </div>
          <div class="otherItem">
            歌手：<span
              @click="router.push('/SingerDetail?id=' + item.id)"
              v-for="item in info.ar"
              :key="item.id"
            >
              {{ item.name }}&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="commentContainer">
      <commentArea @commentEvent="commentEvent"></commentArea>
      <loading v-if="!commentList.length && total != 0"></loading>
      <emptyContent v-else-if="total == 0"></emptyContent>
      <div v-else class="commentContent">
        <div v-if="hotCommentList.length" style="margin-bottom: 30px">
          <div class="title">热门评论</div>
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
            :type="0"
          ></commentItem>
        </div>
        <div ref="resourceInfoTitleRef" v-if="commentList.length" class="title">
          最新评论
        </div>
        <commentItem
          v-if="commentList.length"
          v-for="item in commentList"
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
          :type="0"
        ></commentItem>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
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
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref } from "vue";
import { getSongDetail, getSongComment } from "@/network/SongDetail/songDetail";
import { InitData } from "@/types/CommentDetail/CommentList";
import { useRouter } from "vue-router";
import { commentResource } from "@/network/UserInfo/userEvents";
import commentArea from "@/components/common/commentArea.vue";
import commentItem from "@/components/private/commentItem.vue";
import loading from "@/components/common/loading.vue";
import emptyContent from "@/components/common/emptyContent.vue";
import useToPoint from "@/hooks/useToPoint";
import useLogin from "@/hooks/useLogin";

export default defineComponent({
  name: "CommentList",
  components: {
    commentArea,
    commentItem,
    loading,
    emptyContent,
  },
  setup() {
    const resourceInfoTitleRef = ref();
    const router = useRouter();
    const data = reactive(new InitData());
    data.id = router.currentRoute.value.query.id as string;

    // 获取评论
    const getComment = (type?: string) => {
      getSongComment({
        id: data.id,
        limit: 30,
        offset: (data.offset - 1) * 30,
      }).then((res: any) => {
        console.log(res);
        if (type == "all") {
          data.total = res.data.total;
          data.hotCommentList = res.data.hotComments;
        }
        data.commentList = res.data.comments;
      });
    };
    // 切换评论页码
    const pageChange = (e: number) => {
      data.offset = e;
      getComment();
      useToPoint(resourceInfoTitleRef.value, 0);
    };
    // 发送评论
    const commentEvent = (e: { content: string; cid: number }) => {
      if (useLogin()) {
        if (e.cid) {
          commentResource({
            t: 2,
            type: 0,
            id: parseInt(data.id),
            content: e.content,
            commentId: e.cid,
          }).then((res: any) => {
            if (res.data.code == 200) {
              setTimeout(() => {
                data.offset = 1;
                getComment();
              }, 300);
            }
          });
        } else {
          commentResource({
            t: 1,
            type: 0,
            id: parseInt(data.id),
            content: e.content,
          }).then((res: any) => {
            if (res.data.code == 200) {
              res.data.comment.likedCount = 0;
              data.commentList.unshift(res.data.comment);
            }
          });
        }
      }
    };

    if (router.currentRoute.value.query.type == "song") {
      getSongDetail({
        ids: data.id,
      }).then((res: any) => {
        data.info = res.data.songs[0];
      });
      getComment("all");
    }

    return {
      router,
      resourceInfoTitleRef,
      commentEvent,
      pageChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#CommentList {
  padding: 30px;
  .topContainer {
    display: flex;
    align-items: center;
    .rightInfo {
      margin-left: 15px;
      .infoTitle {
        font-weight: bold;
      }
      .infoOther {
        display: flex;
        align-items: center;
        font-size: 13px;
        margin-top: 6px;
        .otherItem {
          margin-right: 30px;
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
  .commentContainer {
    margin-top: 20px;
    .commentContent {
      .title {
        font-weight: bold;
        margin-bottom: 15px;
      }
    }
  }
}
</style>