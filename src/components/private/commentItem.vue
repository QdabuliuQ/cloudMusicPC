<template>
  <div v-if="show" class="commentItem">
    <div class="itemImage">
      <el-avatar
        @click="toDetail(userId)"
        style="margin-top: 5px"
        :size="40"
        :src="avatarUrl"
      />
    </div>
    <div
      :style="{ cursor: !disOperation ? 'pointer' : 'auto' }"
      @click="commentDetail(cid)"
      class="itemInfo"
    >
      <div class="infoBox">
        <div class="topInfo">
          <div class="infoName">
            <span @click.stop="toDetail(userId)">{{ nickname }}</span
            >:<span class="infoContent">&nbsp;{{ content }}</span>
          </div>
        </div>
        <div v-if="beReplied && beReplied.length" class="centerInfo">
          <div
            @click.stop="commentDetail(item.beRepliedCommentId)"
            v-for="item in beReplied"
            :key="item.beRepliedCommentId"
            class="listItem"
          >
            <span @click.stop="toDetail(item.user.userId)"
              >{{ item.user.nickname }}:</span
            >&nbsp;{{ item.content }}
          </div>
        </div>
        <div class="bottomInfo">
          <div class="time">
            {{ $getTime(time) }}
          </div>
          <div class="data">
            <div
              @click.stop="praiseResource"
              :class="[isLike ? 'likeItem' : '', 'dataItem']"
            >
              <img v-if="!isLike" src="~images/common/unpraise.png" alt="" />
              <img v-else src="~images/common/praise.png" alt="" />
              {{ count }}
            </div>
            <div
              v-if="!disOperation"
              @click.stop="replyComment"
              class="dataItem"
            >
              <img
                style="margin-right: 0; position: relative; top: 1px"
                src="~images/common/comment.png"
                alt=""
              />
            </div>
            <el-popconfirm
              v-if="!disOperation && useLogin(false) && uid == userId"
              @confirm="confirmDelete"
              icon-color="#ec4141"
              confirm-button-type="danger"
              title="是否确定删除该评论"
              confirm-button-text="确定"
              cancel-button-text="取消"
            >
              <template #reference>
                <div @click.native.stop class="dataItem">
                  <img src="~images/common/delete.png" alt="" />
                  删除
                </div>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, watch, reactive, toRefs } from "vue";
import { commentLike } from "@/network/VideoPlay/videoPlay";
import useLogin from "@/hooks/useLogin";
import { commentResource } from "@/network/UserInfo/userEvents";
import bus from "vue3-eventbus";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "commentItem",
  emits: ["deleteCallback"],
  props: [
    "avatarUrl",
    "time",
    "likedCount",
    "content",
    "nickname",
    "userId",
    "beReplied",
    "liked",
    "type",
    "id",
    "cid",
    "threadId",
    "disOperation",
  ],
  setup(props, context) {
    const router = useRouter();
    const data = reactive({
      isLike: false,
      count: 0,
      uid: "0",
      show: true,
    });

    if (localStorage.getItem("id")) {
      data.uid = decodeURIComponent(
        window.atob(localStorage.getItem("id") as string)
      );
    }

    watch(
      () => props.liked,
      (n) => {
        data.isLike = n;
      },
      { immediate: true }
    );
    watch(
      () => props.likedCount,
      (n) => {
        data.count = n;
      },
      { immediate: true }
    );

    // 评论详情
    const commentDetail = (e: number) => {
      if (!props.disOperation) {
        if (
          props.type == 0 ||
          props.type == 1 ||
          props.type == 2 ||
          props.type == 3 ||
          props.type == 4 ||
          props.type == 5
        ) {
          router.push(
            `/CommentDetail?cid=${e}&id=${props.id}&type=${props.type}`
          );
        }
      }
    };

    const toDetail = (e: number) => {
      router.push(`/UserDetail?id=${e}`);
    };

    // 回复评论
    const replyComment = () => {
      if (useLogin()) {
        bus.emit("replyComment", {
          id: props.cid,
          name: props.nickname,
        });
      }
    };

    // 删除评论
    const confirmDelete = () => {
      if (useLogin()) {
        commentResource({
          t: 0,
          type: props.type,
          id: props.id,
          content: "",
          commentId: props.cid,
        }).then((res: any) => {
          if (res.data.code == 200) {
            data.show = false;
          }
        });
      }
    };

    const praiseResource = () => {
      if (useLogin()) {
        if (props.type != 6) {
          commentLike({
            type: props.type,
            t: data.isLike ? 0 : 1,
            id: props.id,
            cid: props.cid,
          }).then((res: any) => {
            if (res.data.code == 200) {
              data.isLike = !data.isLike;
              data.isLike ? data.count++ : data.count--;
            }
          });
        } else {
          // 动态评论点赞
          commentLike({
            type: props.type,
            t: data.isLike ? 0 : 1,
            threadId: props.threadId,
            cid: props.cid,
          }).then((res: any) => {
            if (res.data.code == 200) {
              data.isLike = !data.isLike;
              data.isLike ? data.count++ : data.count--;
            }
          });
        }
      }
    };

    return {
      ...toRefs(data),
      praiseResource,
      confirmDelete,
      replyComment,
      toDetail,
      commentDetail,
      useLogin,
    };
  },
});
</script>

<style lang='less'>
.commentItem {
  display: flex;
  padding: 12px 12px;
  border-radius: 8px;
  &:hover {
    background: var(--hoverColor);
  }
  .itemImage {
    margin-right: 10px;
    cursor: pointer;
  }
  .itemInfo {
    flex: 1;
    font-size: 13px;
    .listItem {
      span {
        cursor: pointer;
      }
    }
    .topInfo {
      display: flex;
      align-items: center;
      .infoName {
        color: var(--nameColor);
        cursor: pointer;
        line-height: 21px;
        word-break: break-all;
      }
      .infoContent {
        color: var(--textColor);
      }
    }
    .centerInfo {
      margin-top: 6px;
      padding: 10px 15px;
      font-size: 12px;
      background-color: var(--chlidCommentBgc);
      border-radius: 8px;
      color: var(--textColor);
      cursor: pointer;
      span {
        color: var(--nameColor);
      }
    }
    .bottomInfo {
      width: 100%;
      margin-top: 10px;
      font-size: 12px;
      color: var(--textColor);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .data {
        display: flex;
        align-items: center;
      }
      .likeItem {
        color: @themeColor;
      }
      .dataItem {
        font-size: 12px;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: var(--textColor);
        &:not(:last-child) {
          margin-right: 20px;
        }
        &:hover {
          color: @themeColor;
        }
        img {
          width: 15px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>