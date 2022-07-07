<template>
  <div class="operationContainer">
    <div class="eventOperate">
      <div class="operationBox">
        <div style="margin-right: 30px" class="opeItem">
          <img v-if="!liked" src="~images/common/unpraise.png" alt="" />
          <img v-else src="~images/common/praise.png" alt="" />
          {{ likedCount }}
        </div>
        <div @click="eventComment" style="margin-right: 30px" class="opeItem">
          <img
            style="position: relative; top: 1px"
            src="~images/common/comment.png"
            alt=""
          />
          {{ commentCount }}
        </div>
        <div style="margin-right: 30px" class="opeItem">
          <img src="~images/common/share.png" alt="" />
          {{ shareCount }}
        </div>
        <el-popconfirm icon-color="#ec4141" confirm-button-type="danger" title="是否确定删除该动态" confirm-button-text="确定" cancel-button-text="取消">
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
        <div class="pushBtn">评论</div>
      </div>
      <div style="margin-bottom: 30px" v-if="hotCommentList.length" class="commentList">
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
          :key="item.commentId"
        ></commentItem>
      </div>
      <div v-if="!commentList.length && !hotCommentList.length" class="noComment">还没有评论哦，快来抢沙发~</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import commentItem from "@/components/private/commentItem.vue";
import { getEventComment } from "@/network/UserInfo/UserEvents";
import bus from "vue3-eventbus";

export default defineComponent({
  name: "eventOperate",
  components: {
    commentItem,
  },
  props: ["threadId", "liked", "likedCount", "commentCount", "shareCount"],
  setup(props) {
    const data = reactive({
      comment: "",
      showComment: false,
      commentList: [],
      hotCommentList: [],
    });

    const eventComment = () => {
      data.showComment = !data.showComment;
      if (data.showComment) {
        bus.emit("openCommentPanel", props.threadId);
        getEventComment({
          threadId: props.threadId,
        }).then((res: any) => {
          data.commentList = res.data.comments;
          data.hotCommentList = res.data.hotComments
        });
      }
    };

    onMounted(() => {
      // 关闭弹窗
      bus.on('openCommentPanel', (e: number) => {
        if (props.threadId != e) {
          data.showComment = false
        }
      })
    });
    return {
      ...toRefs(data),
      eventComment,
    };
  },
});
</script>

<style lang='less'>
.el-popper.is-light {
  background-color: #424242 !important;
  border: 1px solid #414243 !important;
  font-size: 13px;
  .el-popconfirm {
    color: #Fff;
  }
  .el-popper__arrow::before {
    background-color: #424242 !important;
  }
  .el-button.is-text {
    color: #Fff;
    &:hover {
      background-color: @hoverColor;
    }
  }
}
.operationContainer {
  width: 100%;
  margin: 20px 0 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #4c4c4c;
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
  }
  .commentContainer {
    margin-top: 10px;
    margin-left: 60px;
    padding: 12px;
    border-radius: 8px;
    background-color: @eventBgc;
    .textBox {
      padding: 8px;
      background-color: #505050;
      border-radius: 8px;
      textarea {
        resize: none;
        background-color: transparent;
        width: 100%;
        height: 50px;
        border: 0;
        color: #fff;
        outline: none;
      }
    }
    .pushBtn {
      margin-top: 5px;
      padding: 8px 20px;
      font-size: 13.4px;
      border-radius: 8px;
      border: 1px solid #6c6c6c;
      cursor: pointer;
      transition: 0.2s all linear;
      &:hover {
        background-color: @themeColor;
        border: 1px solid @themeColor;
      }
    }
    .commentTitle {
      font-weight: bold;
      font-size: 14px;
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