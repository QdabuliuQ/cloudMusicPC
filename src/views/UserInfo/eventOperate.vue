<template>
  <div class="operationContainer">
    <div class="eventOperate">
      <div class="operationBox">
        <div
          @click="praiseEvent"
          style="margin-right: 30px"
          :class="[isLike ? 'likeItem' : '', 'opeItem']"
        >
          <img v-if="!isLike" src="~images/common/unpraise.png" alt="" />
          <img v-else src="~images/common/praise.png" alt="" />
          {{ likeSum }}
        </div>
        <div @click="eventComment" style="margin-right: 30px" class="opeItem">
          <img
            style="position: relative; top: 1px"
            src="~images/common/comment.png"
            alt=""
          />
          {{ commentSum }}
        </div>
        <div
          @click="shareEvent"
          :style="{ marginRight: id == uid ? '30px' : '0' }"
          class="opeItem"
        >
          <img src="~images/common/share.png" alt="" />
          {{ shareCount }}
        </div>
        <el-popconfirm
          v-if="id == uid"
          @confirm="confirmDelete"
          icon-color="#ec4141"
          confirm-button-type="danger"
          title="是否确定删除该动态"
          confirm-button-text="确定"
          cancel-button-text="取消"
        >
          <template #reference>
            <div class="opeItem">
              <img src="~images/common/delete.png" alt="" />
            </div>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div v-if="showComment" class="commentContainer">
      <div class="textBox">
        <textarea v-model="comment"></textarea>
      </div>
      <div style="display: flex; justify-content: flex-end">
        <div @click="pushComment" class="pushBtn">评论</div>
      </div>
      <div
        style="margin-bottom: 30px"
        v-if="hotCommentList.length"
        class="commentList"
      >
        <div class="commentTitle">热门评论</div>
        <commentItem
          v-for="item in hotCommentList"
          :avatarUrl="item.user.avatarUrl"
          :time="item.time"
          :likedCount="item.likedCount"
          :content="item.content"
          :nickname="item.user.nickname"
          :userId="item.user.userId"
          :beReplied="item.beReplied"
          :liked="item.liked"
          :threadId="threadId"
          :cid="item.commentId"
          :type="6"
          :key="item.commentId"
        ></commentItem>
      </div>
      <div v-if="commentList.length" class="commentList">
        <div class="commentTitle">最新评论</div>
        <commentItem
          v-for="item in commentList"
          :avatarUrl="item.user.avatarUrl"
          :time="item.time"
          :likedCount="item.likedCount"
          :content="item.content"
          :nickname="item.user.nickname"
          :userId="item.user.userId"
          :beReplied="item.beReplied"
          :liked="item.liked"
          :threadId="threadId"
          :cid="item.commentId"
          :type="6"
          :key="item.commentId"
        ></commentItem>
      </div>
      <div
        v-if="!commentList.length && !hotCommentList.length"
        class="noComment"
      >
        还没有评论哦，快来抢沙发~
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { watch, defineComponent, reactive, onMounted, toRefs } from "vue";
import commentItem from "@/components/private/commentItem.vue";
import {
  getEventComment,
  praiseResource,
  commentResource,
} from "@/network/UserInfo/userEvents";
import bus from "vue3-eventbus";
import useLogin from "@/hooks/useLogin";
let timer: any;

export default defineComponent({
  name: "eventOperate",
  components: {
    commentItem,
  },
  props: [
    "threadId",
    "liked",
    "likedCount",
    "commentCount",
    "shareCount",
    "uid",
  ],
  setup(props) {
    const data = reactive({
      comment: "",
      showComment: false,
      commentList: <any>[],
      hotCommentList: [],
      isLike: false,
      likeSum: 0,
      commentSum: 0,
      id: decodeURIComponent(window.atob(localStorage.getItem("id") as string)),
    });

    watch(
      () => props.liked,
      (e) => {
        data.isLike = e;
      },
      { immediate: true }
    );

    watch(
      () => props.likedCount,
      (e) => {
        data.likeSum = e;
      },
      { immediate: true }
    );

    watch(
      () => props.commentCount,
      (e) => {
        data.commentSum = e;
      },
      { immediate: true }
    );

    // 删除动态
    const confirmDelete = () => {
      if (useLogin()) {
        bus.emit("deleteEvent", props.threadId);
      }
    };

    // 转发动态
    const shareEvent = () => {
      if (useLogin()) {
        bus.emit("shareEvent", props.threadId);
      }
    };

    // 点赞动态
    const praiseEvent = () => {
      if (useLogin()) {
        data.isLike = !data.isLike;
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          praiseResource({
            t: data.isLike ? 1 : 0,
            type: 6,
            threadId: props.threadId,
          }).then((res: any) => {
            if (res.data.code == 200) {
              data.isLike ? data.likeSum++ : data.likeSum--;
            }
          });
        }, 500);
      }
    };

    // 发表评论
    const pushComment = () => {
      if (useLogin()) {
        if (data.comment.trim() != "") {
          commentResource({
            t: 1,
            type: 6,
            threadId: props.threadId,
            content: data.comment.trim(),
          }).then((res: any) => {
            if (res.data.code == 200) {
              res.data.comment.likedCount = 0;
              data.commentList.unshift(res.data.comment);
              data.commentSum++;
              data.comment = "";
            }
          });
        }
      }
    };

    const eventComment = () => {
      data.showComment = !data.showComment;
      if (data.showComment) {
        bus.emit("openCommentPanel", props.threadId);
        getEventComment({
          threadId: props.threadId,
        }).then((res: any) => {
          data.commentList = res.data.comments;
          data.hotCommentList = res.data.hotComments;
        });
      }
    };

    onMounted(() => {
      // 关闭弹窗
      bus.on("openCommentPanel", (e: number) => {
        if (props.threadId != e) {
          data.showComment = false;
        }
      });
    });
    return {
      ...toRefs(data),
      eventComment,
      confirmDelete,
      praiseEvent,
      shareEvent,
      pushComment,
    };
  },
});
</script>

<style lang='less'>
.operationContainer {
  width: 100%;
  margin: 20px 0 0;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--borderColor);
  .eventOperate {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .operationBox {
      display: flex;
      align-items: center;
    }
    .opeItem {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 12.5px;
      color: @fontColor;
      img {
        width: 18px;
        margin-right: 4px;
      }
    }
    .likeItem {
      color: @themeColor !important;
    }
  }
  .commentContainer {
    margin-top: 10px;
    margin-left: 60px;
    padding: 12px;
    border-radius: 8px;
    background-color: var(--eventBgc);
    .textBox {
      padding: 8px;
      background-color: var(--eventCommentBgc);
      border-radius: 8px;
      textarea {
        resize: none;
        background-color: transparent;
        width: 100%;
        height: 50px;
        border: 0;
        color: var(--textColor);
        outline: none;
      }
    }
    .pushBtn {
      margin-top: 5px;
      padding: 8px 20px;
      font-size: 13.4px;
      border-radius: 8px;
      border: 1px solid var(--borderColor);
      cursor: pointer;
      transition: 0.2s all linear;
      color: var(--textColor);
      &:hover {
        background-color: @themeColor;
        border: 1px solid @themeColor;
        color: #fff;
      }
    }
    .commentTitle {
      font-weight: bold;
      font-size: 14px;
      color: var(--textColor);
    }
    .noComment {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px 0;
      color: @fontColor;
      font-size: 13px;
    }
  }
}
</style>